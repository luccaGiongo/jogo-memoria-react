import * as C from './App.styles';
import logoImage from './assets/devmemory_logo.png';
import RestartIcon from './svgs/restart.svg';
import { InfoItem } from './components/InfoItem/InfoItem';
import { Button } from './components/Button/Button';
import { useEffect, useState } from 'react';
import { GridItemType } from './types/gridItemType';
import { items } from './data/items';

const App = () => {

  const [playng, setPlayng] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [showCount, setShowcount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);

  useEffect(() => resetAndCreateGrid(), []);

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
        PermanentShown: false
      });
    }
    // Preencher o grid
    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < items.length; i++) {
        let pos = -1;
        while (pos < 0 || tmpGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 12));
        }
        tmpGrid[pos].item = i;
      }
    }
    // Jogar na State
    setGridItems(tmpGrid);
    // Começar o Jogo;
    setPlayng(true);
  }

  return (
    <>
      <C.GlobalStyle />
      <C.Container>
        <C.Info>
          <C.LogoLink href="">
            <img src={logoImage} width="200" alt="Imagem Aqui" />
          </C.LogoLink>
          <C.InfoArea>
            <InfoItem label='Tempo' value='00-00' />
            <InfoItem label='Movimentos' value='0' />
          </C.InfoArea>
          <Button label="Reiniciar" icon={RestartIcon} onClick={resetAndCreateGrid} />
        </C.Info>

        <C.GridArea>
          <C.Grid>

            adasd
          </C.Grid>
        </C.GridArea>
      </C.Container>
    </>
  );
}

export default App;