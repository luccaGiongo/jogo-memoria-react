import { GridItemType } from '../../types/gridItemType';
import * as C from './GridItem.style';
import { items } from '../../data/items';

import ImgPadrao from '../../svgs/b7.svg';

type Props = {
    item: GridItemType;
    onClick: () => void
}


export const GridItem = ({ item, onClick }: Props) => {
    return (
        <C.Container 
         showBackground={item.permanentShown || item.shown}
         onClick={onClick}>
            {item.permanentShown === false && item.shown === false &&
                <C.Icon src={ImgPadrao} alt="" opacity={.5} />
            }
            {(item.permanentShown || item.shown) && item.item !== null &&
                <C.Icon src={items[item.item].icon} alt='' />
            }
        </C.Container>
    );
}