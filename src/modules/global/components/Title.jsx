import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
export const Title = ({ text }) => {
    const ref = useRef(null);

    const isInView = useInView(ref, { once: true })


    return (
        <h1 className="text-5xl text-[#F2F2F2] font-bold" ref={ref}>
            {text.split('').map((letter, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                >
                    {letter}
                </motion.span>
            ))}
        </h1>
    )
}
