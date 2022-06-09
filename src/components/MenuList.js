import { BsFillHouseFill, BsJournalAlbum } from "react-icons/bs";
import { BiPulse, BiSearchAlt } from "react-icons/bi";
import { FaBroadcastTower, FaMicrophoneAlt, FaPodcast } from "react-icons/fa";

const MenuList = [
  {
    id: 1,
    icon: <BsFillHouseFill />,
    name: "Home",
  },
  {
    id: 2,
    icon: <BiSearchAlt />,
    name: "Search",
  },
  {
    id: 3,
    icon: <BiPulse />,
    name: "Discover",
  },
  {
    id: 4,
    icon: <FaBroadcastTower />,
    name: "Radio",
  },
  {
    id: 5,
    icon: <FaMicrophoneAlt />,
    name: "Artist",
  },
  {
    id: 6,
    icon: <BsJournalAlbum />,
    name: "Albums",
  },
  {
    id: 7,
    icon: <FaPodcast />,
    name: "Podcasts",
  },
];

export { MenuList };
