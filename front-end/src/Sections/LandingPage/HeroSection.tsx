import { motion } from "framer-motion";

const Hero = () => {
  const circlePositions = [
    { top: '20%', left: '10%' },
    { top: '30%', left: '60%' },
    { top: '40%', left: '80%' },
    { top: '60%', left: '15%' },
    { top: '70%', left: '50%' },
    { top: '50%', left: '70%' }
  ];

  return (
    <section
      id="accueil"
      className="relative text-white pt-20 pb-32 md:pb-40 overflow-hidden"
    >
      {/* Modern background pattern */}
      <div className="absolute inset-0 bg-blue-900 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
        </div>
        
        {/* Animated gradient overlay */}
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10, 78, 195, 0.81)_0%,rgba(0,8,20,1)_100%)]"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: [0.8, 0.9, 0.8] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Subtle diagonal stripes */}
        <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.1)_10px,rgba(255,255,255,0.1)_20px)]"></div>
      </div>

      {/* Interactive floating shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {circlePositions.map((position, i) => (
          <motion.div
            key={i}
            initial={{ x: 0, y: 0 }}
            animate={{
              x: [0, 20, -20, 0],
              y: [0, -20, 20, 0],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-16 h-16 bg-white/10 rounded-full backdrop-blur-sm"
            style={{
              top: position.top,
              left: position.left,
            }}
          ></motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-12">
          {/* Left content */}
          <div className="md:w-1/2 mb-12 md:mb-0">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              L'Avenir de la Recherche <span className="text-yellow-300">Technologique</span>
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl lg:text-2xl text-blue-100 mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Rejoignez une communauté dynamique de chercheurs et d'innovateurs à l'avant-garde de la technologie.
            </motion.p>
            
            {/* Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <a 
                href="#programmes" 
                className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium rounded-full group bg-white text-blue-900 hover:bg-gray-100 transition duration-300 hover:shadow-lg"
              >
                <span className="relative z-10 font-semibold">Postuler</span>
              </a>
            </motion.div>

            {/* Student avatars */}
            <motion.div 
              className="flex items-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="flex -space-x-3">
                {[1, 2, 3].map((item) => (
                  <motion.img 
                    key={item}
                    src={`https://randomuser.me/api/portraits/${item % 2 === 0 ? 'women' : 'men'}/${item + 20}.jpg`}
                    alt="Étudiant"
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    loading="lazy"
                    whileHover={{ scale: 1.1, zIndex: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  />
                ))}
                <div className="w-10 h-10 rounded-full bg-blue-800 border-2 border-white flex items-center justify-center text-xs font-bold">50+</div>
              </div>
              <div>
                <p className="text-sm text-blue-100">Rejoignez nos <span className="font-bold">150 doctorants</span> en formation</p>
              </div>
            </motion.div>
          </div>

          {/* Right image with badges */}
          <div className="md:w-1/2 flex justify-center">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="Doctoral Research"
                className="rounded-2xl shadow-2xl w-full max-w-md h-auto ring-4 ring-white/20 transform hover:scale-[1.02] transition duration-500"
                loading="lazy"
              />

              {/* Ranking badge */}
              <motion.div 
                className="absolute -bottom-5 -left-5 bg-blue-700 p-3 rounded-2xl shadow-lg z-20 animate:pulse hover:animate-none transition duration-300"
                whileHover={{ scale: 1.05 }}
                animate={{
                  scale: [1, 1.03, 1],
                  boxShadow: ["0 10px 15px -3px rgba(0, 0, 0, 0.3)", "0 20px 25px -5px rgba(0, 0, 0, 0.4)", "0 10px 15px -3px rgba(0, 0, 0, 0.3)"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a 1 1 0 0 0 -0.364 -1.118 L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-white/80">Classement 2023</p>
                    <p className="text-white font-bold">Top 1% en Afrique</p>
                  </div>
                </div>
              </motion.div>

              {/* Success rate badge */}
              <motion.div 
                className="absolute -top-5 -right-5 bg-white p-3 rounded-2xl shadow-lg z-20 transition duration-300"
                whileHover={{ scale: 1.05 }}
                animate={{
                  scale: [1, 1.03, 1],
                  boxShadow: ["0 10px 15px -3px rgba(0, 0, 0, 0.1)", "0 20px 25px -5px rgba(0, 0, 0, 0.2)", "0 10px 15px -3px rgba(0, 0, 0, 0.1)"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Taux de réussite</p>
                    <p className="text-blue-900 font-bold">98%</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;