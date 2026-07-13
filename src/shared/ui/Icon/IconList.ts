/**
 * https://react-icons.github.io/react-icons/
 */

import { AiOutlineClose, AiOutlineDown, AiOutlineExclamationCircle, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { BiImageAdd, BiLink } from 'react-icons/bi';
import { LuTextQuote } from 'react-icons/lu';
import {
    MdFormatLineSpacing,
    MdFormatListNumbered,
    MdFormatStrikethrough,
    MdOutlineEmail,
    MdOutlineFormatListBulleted,
    MdPhone,
} from 'react-icons/md';
import { PiArrowArcLeft, PiTextAlignCenter, PiTextAlignJustify, PiTextAlignLeft, PiTextAlignRight } from 'react-icons/pi';
import { RxHamburgerMenu } from 'react-icons/rx';
import { TbLetterSpacing } from 'react-icons/tb';
import { TfiArrowCircleLeft, TfiArrowCircleRight } from 'react-icons/tfi';
import { VscPinned } from 'react-icons/vsc';


export const ICON_LIST = {
    // Ant Design icons
    close: AiOutlineClose,
    error: AiOutlineExclamationCircle,
    minus: AiOutlineMinus,
    plus: AiOutlinePlus,
    arrowDown: AiOutlineDown,

    //Md
    email: MdOutlineEmail,
    phone: MdPhone,
    lineHeight: MdFormatLineSpacing,
    unorderingList: MdOutlineFormatListBulleted,
    orderingList: MdFormatListNumbered,
    strikethrough: MdFormatStrikethrough,

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

    //Bi
    addImage: BiImageAdd,
    link: BiLink,

    //Tb
    charSpacing: TbLetterSpacing,

    //Lu
    quote: LuTextQuote,
};
