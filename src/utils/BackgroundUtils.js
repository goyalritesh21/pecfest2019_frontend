import BackgroundImage0 from "../assets/images/Background/0.jpg"
import BackgroundImage1 from "../assets/images/Background/1.jpg"
import BackgroundImage2 from "../assets/images/Background/2.jpg"
import BackgroundImage3 from "../assets/images/Background/3.jpg"
import BackgroundImage4 from "../assets/images/Background/4.jpg"
import BackgroundImage5 from "../assets/images/Background/5.jpg"
import BackgroundImage6 from "../assets/images/Background/6.jpg"
import BackgroundImage7 from "../assets/images/Background/7.jpg"
import BackgroundImage8 from "../assets/images/Background/8.jpg"
import BackgroundImage9 from "../assets/images/Background/9.jpg"
import BackgroundImage10 from "../assets/images/Background/10.jpg"
import BackgroundImage11 from "../assets/images/Background/11.jpg"

export function getBackgroundImage(hourOfDay) {
    console.log(hourOfDay);
    switch (hourOfDay) {
        case 0:
        case 1:
            return BackgroundImage0;
        case 2:
        case 3:
            return BackgroundImage1;
        case 4:
        case 5:
            return BackgroundImage2;
        case 6:
        case 7:
            return BackgroundImage3;
        case 8:
        case 9:
            return BackgroundImage4;
        case 10:
        case 11:
            return BackgroundImage5;
        case 12:
        case 13:
            return BackgroundImage6;
        case 14:
        case 15:
            return BackgroundImage7;
        case 16:
        case 17:
            return BackgroundImage8;
        case 18:
        case 19:
            return BackgroundImage9;
        case 20:
        case 21:
            return BackgroundImage10;
        case 22:
        case 23:
            return BackgroundImage11;
        default:
            return BackgroundImage6;
    }
};