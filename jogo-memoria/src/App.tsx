import * as C from './App.styles';
import logoImage from './assets/luccamemory_logo.png';
import RestartIcon from './svgs/restart.svg';
// Importação de Componentes
import { InfoItem } from './components/InfoItem/InfoItem';
import { Button } from './components/Button/Button';
import { GridItem } from './components/GridItem/GridItem';
// Importação de Estados
import { useEffect, useState } from 'react';
// Importação de Tipos
import { GridItemType } from './types/gridItemType';
// Importação de Dados
import { items } from './data/items';
import { formatTimeElapsed } from './helpers/formatTimeElapsed';

const App = () => {
  // Estado sobre estar ou não jogando
  const [playng, setPlayng] = useState<boolean>(false);
  // Estado sobre o tempo que passou
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  // Estado sobre a quantidade de movimentos feitos
  const [moveCount, setMoveCount] = useState<number>(0);
  // Contador de Cartas Mostradas
  const [showCount, setShowcount] = useState<number>(0);

  const [gridItems, setGridItems] = useState<GridItemType[]>([]);

  useEffect(() => resetAndCreateGrid(), []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (playng === true) {
        setTimeElapsed(timeElapsed + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [playng, timeElapsed]);

  // Verificar a igualdade;
  useEffect(() => {
    if (showCount === 2) {
      let opened = gridItems.filter(item => item.shown === true);
      if (opened.length === 2) {

        // Se iguais, torná-los, permanente 
        if (opened[0].item === opened[1].item) {
          let tmpGrid = [...gridItems];
          for (let i in tmpGrid) {
            if (tmpGrid[i].shown) {
              tmpGrid[i].permanentShown = true;
              tmpGrid[i].shown = false;
            }
          }
          setGridItems(tmpGrid);
          setShowcount(0);
        } else {
          // diferentes, fechá-los
          setTimeout(() => {
            let tmpGrid = [...gridItems];
            for (let i in tmpGrid) {
              tmpGrid[i].shown = false;
            }
            setGridItems(tmpGrid);
            setShowcount(0);
          }, 1000)
        }

        setMoveCount(moveCount => moveCount + 1);
      }
    }
  }, [showCount, gridItems]);

  // verifica sim do game;
  useEffect(() => {
    if(moveCount > 0 && gridItems.every(item => item.permanentShown === true)){
      setPlayng(false);
    }
  }, [moveCount, gridItems]);

  const resetAndCreateGrid = () => {
    // Resetar o Jogo
    setTimeElapsed(0);
    setMoveCount(0);
    setShowcount(0);
    // Criar Grid vazio;
    let tmpGrid: GridItemType[] = [];
    for (let i = 0; i < (items.length * 2); i++) {
      tmpGrid.push({
        item: null,
        shown: false,
        permanentShown: false
      });
    }
    // Preencher o grid
    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < items.length; i++) {
        let pos = -1;
        while (pos < 0 || tmpGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2));
        }
        tmpGrid[pos].item = i;
      }
    }
    // Jogar na State
    setGridItems(tmpGrid);
    // Começar o Jogo;
    setPlayng(true);
  }

  const handleItemClick = (index: number) => {
    if (playng && index !== null && showCount < 2) {
      let tmpGrid = [...gridItems];
      if (tmpGrid[index].permanentShown === false && tmpGrid[index].shown === false) {
        tmpGrid[index].shown = true;
        setShowcount(showCount + 1);
      }

      setGridItems(tmpGrid);
    }
  }


  return (
    <>
      <C.GlobalStyle />
      <C.Container>
        <C.Info>
          <C.LogoLink href="">
            <img src={logoImage} width="250" alt="Imagem Aqui" />
          </C.LogoLink>
          <C.InfoArea>
            <InfoItem label='Tempo' value={formatTimeElapsed(timeElapsed)} />
            <InfoItem label='Movimentos' value={moveCount.toString()} />
          </C.InfoArea>
          <Button label="Reiniciar" icon={RestartIcon} onClick={resetAndCreateGrid} />
        </C.Info>
        <C.GridArea>
          <C.Grid>
            {gridItems.map((item, index) => (
              <GridItem
                key={index}
                item={item}
                onClick={() => handleItemClick(index)}
              />
            ))}
          </C.Grid>
        </C.GridArea>
      </C.Container>
    </>
  );
}

export default App;