import GroovzImage from "../assets/images/MegaShows/Groovz.JPG";
import StarNightImage from "../assets/images/MegaShows/starNight.jpg";
import DJNightImage from "../assets/images/MegaShows/pronight.jpg";
import BhangraThequeImage from "../assets/images/MegaShows/BhangraTheque.jpg";
import GlitteratiImage from "../assets/images/MegaShows/Glitterati.jpg";
import RockathonImage from "../assets/images/MegaShows/Rockathon.JPG";

export default [
    {
        title: 'Bhangra Theque',
        titleLine: 'Unleash your inner Punjabi',
        venue: 'Day 1, Main Arena',
        link: "https://pecfest.in/events?event=96&eventCategory=3&eventType=9",
        isEvent: true,
        coverPhoto: BhangraThequeImage
    },
    {
        title: 'Rockathon',
        titleLine: 'Show off the Baritone',
        venue: 'Day 1, Main Arena',
        coverPhoto: RockathonImage
    },
    {
        title: 'Groovz',
        titleLine: 'Dance to the Rythm',
        venue: 'Day 1, Main Arena',
        coverPhoto: GroovzImage
    },
    {
        title: 'Glitterati',
        titleLine: 'Own the Runway',
        venue: 'Day 1, Main Arena',
        coverPhoto: GlitteratiImage
    },
    {
        title: 'Star Night',
        titleLine: 'Exult in the Grandeur',
        venue: 'Day 2, Main Arena',
        coverPhoto: StarNightImage
    },
    {
        title: 'Pro Night',
        titleLine: `Sway to the Melody`,
        venue: 'Day 3, Main Arena',
        coverPhoto: DJNightImage
    }
];