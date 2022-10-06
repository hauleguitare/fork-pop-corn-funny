import { Variants } from "framer-motion";

export const buttonVariants: Variants = {
    initial:{
        scale: 0.2,
    },
    animate: {
        scale: 1
    },
    onHover: {
        scale: 1.3,
        rotate: [12, 0, -12, 0],
        transition:{
            duration: 0.3,
            rotate: {
                duration: 0.8
            }
        },
    },

    onTap: {
        scale: 1.3,
        rotate: [18, 0, -18, 0],
        transition: {
        duration: 0.8,
        },
    },
    inView: {
        scale: 1,
        transition: {
            duration: 0.1,
            type: 'spring',
            stiffness: 50,
        },
    },
    inHide: {
        scale: 0.2,
        transition: {
            duration: 0.1,
            type: 'spring',
            stiffness: 50,
        },
    },

    inViewRotate: {
        scale:1,
        rotate: [12, 0, -12, 0, 12, 0, -12, 0],
        transition: {
            duration: 0.7,
            type: 'spring',
            stiffness: 50
        }
    },
}