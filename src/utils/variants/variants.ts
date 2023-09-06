import { Variants } from "framer-motion"

export const popChildrenIn = () => {
    const container = {
        hidden: { x: 0 },
        show: {
            x: 0,
            transition: {
                staggerChildren: 0.06,
                delayChildren: 0.2,
            },
        },
    }
    const child = {
        hidden: { scale: 0.7 },
        show: {
            scale: 1,

        },
    }
    return { container: container, child: child } as { container: Variants, child: Variants }
}
