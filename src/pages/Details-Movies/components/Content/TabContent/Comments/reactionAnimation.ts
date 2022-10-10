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
        scale: 2,
        opacity: 0.08,
        transition: {
            duration: 0.23,
            stiffness: 50,
            ease: 'easeInOut'
        }
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

export const ReactionsBarVariants: Variants = {
    initial: {
        scale: 1,
        opacity: 1
    },
    animate: {
        scale: 1.2
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
}

export const CommentVariants: Variants = {
    initial: {
        y: '50%',
        opacity: 0.3,
        transition:{
            duration: 0.2,
            delay: 0.1
        }
    },
    animate: {
        y: 0,
        opacity: 1
    },
    exit: {
        y: '50%',
        opacity: 0,
        transition:{
            duration: 0.2,
            delay: 0.1
        }
    }
}
