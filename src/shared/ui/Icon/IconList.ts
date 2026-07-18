/**
 * https://react-icons.github.io/react-icons/
 */

import {
    AiOutlineClose,
    AiOutlineDelete,
    AiOutlineDown,
    AiOutlineExclamationCircle,
    AiOutlineHome,
    AiOutlineInbox,
    AiOutlineLeft,
    AiOutlineMenu,
    AiOutlineMinus,
    AiOutlinePlus,
    AiOutlinePlusCircle,
    AiOutlineSearch,
    AiOutlineUp,
    AiOutlineUpload,
    AiOutlineUserAdd,
} from 'react-icons/ai';
import { BiImageAdd, BiLink } from 'react-icons/bi';
import { LuPencil, LuTextQuote } from 'react-icons/lu';
import {
    MdCircle,
    MdFormatLineSpacing,
    MdFormatListNumbered,
    MdFormatStrikethrough,
    MdOutlineEmail,
    MdOutlineFormatListBulleted,
    MdPhone,
} from 'react-icons/md';
import { PiArrowArcLeft, PiMagicWand, PiTextAlignCenter, PiTextAlignJustify, PiTextAlignLeft, PiTextAlignRight } from 'react-icons/pi';
import { RxHamburgerMenu } from 'react-icons/rx';
import { TbLetterSpacing, TbWorldWww } from 'react-icons/tb';
import { TfiArrowCircleLeft, TfiArrowCircleRight } from 'react-icons/tfi';
import { VscPinned } from 'react-icons/vsc';


export const ICON_LIST = {
    // Ant Design icons
    close: AiOutlineClose,
    error: AiOutlineExclamationCircle,
    minus: AiOutlineMinus,
    plus: AiOutlinePlus,
    arrowDown: AiOutlineDown,
    arrowUp: AiOutlineUp,
    arrowLeft: AiOutlineLeft,
    upload: AiOutlineUpload,
    emptyBox: AiOutlineInbox,
    delete: AiOutlineDelete,
    plusCircle: AiOutlinePlusCircle,
    burgerMenu: AiOutlineMenu,
    home: AiOutlineHome,
    userAdd: AiOutlineUserAdd,
    search: AiOutlineSearch,

    //Md
    email: MdOutlineEmail,
    phone: MdPhone,
    lineHeight: MdFormatLineSpacing,
    unorderingList: MdOutlineFormatListBulleted,
    orderingList: MdFormatListNumbered,
    strikethrough: MdFormatStrikethrough,
    circle: MdCircle,

    //Rx
    burger: RxHamburgerMenu,

    //Tfi
    arrowCircleRight: TfiArrowCircleRight,
    arrowCircleLeft: TfiArrowCircleLeft,

    //Vsc
    pinned: VscPinned,

    //Pi
    repost: PiArrowArcLeft,
    textRight: PiTextAlignRight,
    textLeft: PiTextAlignLeft,
    textCenter: PiTextAlignCenter,
    textJustify: PiTextAlignJustify,
    magicWand: PiMagicWand,

    //Bi
    addImage: BiImageAdd,
    link: BiLink,

    //Tb
    charSpacing: TbLetterSpacing,
    world: TbWorldWww,

    //Lu
    quote: LuTextQuote,
    pencil: LuPencil,
};
