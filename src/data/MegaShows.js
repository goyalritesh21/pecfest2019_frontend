import GroovzImage from "../assets/images/MegaShows/Groovz.JPG";
import StarNightImage from "../assets/images/MegaShows/starNight.jpg";
import DJNightImage from "../assets/images/MegaShows/pronight.jpg";
import BhangraThequeImage from "../assets/images/MegaShows/BhangraTheque.jpg";
import GlitteratiImage from "../assets/images/MegaShows/Glitterati.jpg";
import RockathonImage from "../assets/images/MegaShows/Rockathon.JPG";

export default [
    {
        title: 'Guru Randhawa',
        titleLine: 'Exult in the Grandeur with Guru Randhawa',
        venue: 'Day 2, Main Arena',
        isEvent: false,
        coverPhoto: StarNightImage
    },
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
        link: "https://pecfest.in/events?event=83&eventCategory=3&eventType=10",
        isEvent: true,
        coverPhoto: RockathonImage
    },
    {
        title: 'Groovz',
        titleLine: 'Dance to the Rhythm',
        venue: 'Day 1, Main Arena',
        link: "https://pecfest.in/events?event=92&eventCategory=3&eventType=9",
        isEvent: true,
        coverPhoto: GroovzImage
    },
    {
        title: 'Glitterati',
        titleLine: 'Own the Runway',
        venue: 'Day 1, Main Arena',
        link: "https://pecfest.in/events?event=874&eventCategory=3&eventType=26",
        isEvent: true,
        coverPhoto: GlitteratiImage
    },
    {
        title: 'Pro Nite',
        titleLine: `Sway to the Melody`,
        venue: 'Day 3, Main Arena',
        isEvent: false,
        coverPhoto: DJNightImage
    }
];