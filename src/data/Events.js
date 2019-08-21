import Image3 from "../assets/images/Events/3.jpg";
import Image15 from "../assets/images/Events/15.jpg";
import Image8 from "../assets/images/Events/8.jpg";
import Image4 from "../assets/images/Events/4.jpg";
import Image2 from "../assets/images/Events/2.jpg";
import Image6 from "../assets/images/Events/6.jpg";
import Image13 from "../assets/images/Events/13.jpg";
import Image14 from "../assets/images/Events/14.jpg";
import Image5 from "../assets/images/Events/5.jpg";
import Image7 from "../assets/images/Events/7.jpg";
import Image9 from "../assets/images/Events/9.jpg";
import Image11 from "../assets/images/Events/11.jpg";
import Image1 from "../assets/images/Events/1.jpg";
import Image12 from "../assets/images/Events/12.jpg";
import Image10 from "../assets/images/Events/10.jpg";

export const categories = [
    {
        id: 0,
        title: 'Technical',
        subtitle: 'Fashion artisans at work',
        content: [
            "Now, when anything attracted his attention he always asked what it meant; and his mother, or more frequently Uncle Maxim, would explain to him the nature of the objects or of the creatures that caused these various sounds.",
            "His mother’s explanations, more lively and graphic, impressed the boy with greater force; but sometimes this impression would be too painful.",
            "Upon the features of the young woman, herself suffering, could be read the expression of her inmost feelings, and in her eyes a silent protest or a look of pain, as she strove to convey to the child an idea of form and color."
        ],
        coverImage: Image3
    },
    {
        id: 1,
        title: 'Cultural',
        subtitle: 'Contemporary makeup art',
        content: [
            "Thus blindness proved no drawback to systematic physical development, while its influence over the moral nature of the child was reduced to its minimum. He was tall for his age and well built; his face was somewhat pale, his features fine and expressive.",
            "His dark hair enhanced the pallid hue of his complexion, while his eyes—large, dark, and almost motionless—gave him a peculiar aspect that at once attracted attention.",
            "A slight wrinkle between his eye-brows, a habit of inclining his head slightly forward, and the expression of sadness that[93] sometimes overcast his handsome face — these were the outward tokens of his blindness."
        ],
        coverImage: Image15
    },
    {
        id: 2,
        title: 'Lectures',
        subtitle: 'Adventures in Moscow',
        content: [
            "The impressions received through the channels of sound outweighed all others in their influence over the life of the blind boy; his ideas shaped themselves according to sounds, his sense of hearing became the centre of his mental activity.",
            "The enchanting melodies of the songs he heard conveyed to him a true sense of the words, coloring them with sadness or joy according to the lights and shades of the melody.",
            "He quickly learned all his mother taught him on the piano, and yet he still loved Joachim’s pipe."
        ],
        coverImage: Image8
    },
    {
        id: 3,
        title: 'Workshops',
        subtitle: 'Vogue Paris',
        content: [
            "Thus the boy’s day was filled; he could not complain of the lack of new impressions.",
            "He seemed to be living as full a life as any child could possibly live; in fact he really seemed unconscious of his blindness.",
            "Nevertheless, a certain premature sadness was still perceptible in his character, which Maxim ascribed to the fact that he had never mingled with other children, and endeavored to atone for this omission."
        ],
        coverImage: Image4
    }
];

export const categoryEvent = {
    'Technical': {
        "aerospace": ["CoDecode", "Ultimate Coding Showdown", "Code Relay", "Code Mania", "Robo Rush", "Robo War", "Lorem Ipsum", "Dolor Sit Amet"],
        "coding": ["CoDecode", "Ultimate Coding Showdown", "Code Relay", "Code Mania", "Robo Rush", "Robo War"],
        "robotics": ["CoDecode", "Ultimate Coding Showdown", "Code Relay", "Code Mania", "Robo Rush", "Robo War", "Lorem Ipsum", "Dolor Sit Amet", "Lorem Ipsum", "Dolor Sit Amet"],
        "drama": ["CoDecode", "Ultimate Coding Showdown", "Code Relay", "Code Mania", "Robo Rush", "Robo War", "Lorem Ipsum", "Dolor Sit Amet", "Lorem Ipsum", "Dolor Sit Amet", "Lorem Ipsum", "Dolor Sit Amet"],
        "dance": ["CoDecode", "Ultimate Coding Showdown", "Code Relay"],
        "quizzes": ["CoDecode", "Ultimate Coding Showdown", "Code Relay", "Code Mania", "Robo Rush", "Robo War", "Lorem Ipsum"],
        "solartech": ["CoDecode", "Ultimate Coding Showdown", "Code Relay", "Code Mania", "Robo Rush", "Robo War", "Lorem Ipsum", "Dolor Sit Amet", "Lorem Ipsum", "Dolor Sit Amet"]
    },
    'Cultural': {},
    'Lectures': {},
    'Workshops': {}
};

export const events = [
    {
        id: 0,
        title: 'Bhangra Theque',
        subtitle: '',
        locations: 'Yet to be decided',
        prize: '',
        minTeam: 6,
        maxTeam: 16,
        type: 'dance',
        category: {
            id: 1,
            title: 'Cultural'
        },
        description: [],
        shortDescription: "Bhangra Theque – a group Bhangra Competition that witnesses active participation from different colleges to compete in North India's largest fest",
        rules: [
            'There will be two rounds: Prelims and Finals',
            'Maximum team limit is 20 participants per team',
            'Team members (Onstage): 16 (Maximum) and 6 (Minimum)',
            'Time limit for prelims is 3-5 minutes',
            'Dresses are not compulsory during Prelims',
            'Time limit for final performance is 8-12 minutes. Additional 2 minutes will be given for stage set-up.',
            'Teams have to carry their own props and dresses',
            'Performance has to be done only on music. The audio-track should be available in pen-drive and 2 CDs',
            'Performance will be judged on the basis of Choreography, Energy, Coordination, Props, and Dresses',
            'Decision of the judges and organizers will be final regarding any issue during the event',
            'Teams have to report on time for prelims and finals'
        ],
        poster: null,
        association: [],
        coordinators: []
    },
];

export const imageColumns = [
    {
        id: 0,
        isBottom: false,
        images: [
            Image2,
            Image6,
            Image13,
            Image14,
            Image5,
            Image6,
            Image7,
            Image8,
            Image9
        ]
    },
    {
        id: 1,
        isBottom: true,
        images: [
            Image3,
            Image11,
            Image1,
            Image15,
            Image14,
            Image13,
            Image12,
            Image3,
            Image15
        ]
    },
    {
        id: 2,
        isBottom: false,
        images: [
            Image7,
            Image4,
            Image9,
            Image11,
            Image5,
            Image3,
            Image2,
            Image1,
            Image5,
            Image14
        ]
    },
    {
        id: 3,
        isBottom: true,
        images: [
            Image1,
            Image2,
            Image3,
            Image7,
            Image4,
            Image6,
            Image5,
            Image8,
            Image10,
        ]
    }
];