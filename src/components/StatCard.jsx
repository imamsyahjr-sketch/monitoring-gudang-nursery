import { motion } from "framer-motion"

export default function StatCard({ title, value }) {

  return (

    <motion.div

      whileHover={{
        y: -4,
        scale: 1.02
      }}

      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}

      className="
      bg-white
      p-4
      rounded-lg
      shadow-sm
      hover:shadow-lg
      transition
      cursor-pointer
      "

    >

     <p className="text-xs text-gray-500 mb-1 tracking-wide">
  {title}
</p>

<h3 className="text-xl font-semibold text-gray-800">
  {value}
</h3>

    </motion.div>

  )
}