import gsap from 'gsap';
import {SplitText} from "gsap/SplitText";
import {Observer} from "gsap/Observer";

/** A place to register GSAP plugins used in the application. */

gsap.registerPlugin(
    SplitText,
    Observer
);