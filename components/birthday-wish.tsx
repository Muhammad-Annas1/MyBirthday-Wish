'use client'
import React, { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card"
import { motion, AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"
import { FaBirthdayCake, FaGift } from "react-icons/fa"
import { GiBalloons } from "react-icons/gi"

type confettiProps = {
  height: number
  width: number
}

const DynamicConfetti = dynamic(() => import('react-confetti'), { ssr: false })

const candleColors = ["#f8e71c", "#f8e71c", "#f8e71c", "#f8e71c", "#f8e71c"]
const balloonsColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8']
const confettiColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE']

const BirthdayWish = () => {
  const [candlesLit, setCandlesLit] = useState<number>(0)
  const [balloonsPoppedCount, setBalloonsPoppedCount] = useState<number>(0)
  const [showConfetti, setShowConfetti] = useState<boolean>(false)
  const [windowSize, setWindowSize] = useState<confettiProps>({ width: 0, height: 0 })
  const [celebration, setCelebrating] = useState<boolean>(false)

  const totalCandles: number = 5
  const totalBalloons: number = 5

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (candlesLit === totalCandles && balloonsPoppedCount === totalBalloons) {
      setShowConfetti(true)
    }
  }, [candlesLit, balloonsPoppedCount])

  const lightCandle = (index: number) => {
    if (index === candlesLit) {
      setCandlesLit(prev => prev + 1)
    }
  }

  const popBalloon = (index: number) => {
    if (index === balloonsPoppedCount) {
      setBalloonsPoppedCount(prev => prev + 1)
    }
  }

  const celebrate = () => {
    setCelebrating(true)
    setShowConfetti(true)
    const interval = setInterval(() => {
      setCandlesLit(prev => {
        if (prev < totalCandles) return prev + 1
        clearInterval(interval)
        return prev
      })
    }, 500)
  }

  return (
    <div
      className="flex items-center justify-center px-4 py-6 min-h-screen"
      style={{
        backgroundImage: "url('./background-img.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="w-full mx-auto border-2 border-black p-4 md:p-6 overflow-hidden shadow-md md:shadow-xl max-h-[90vh] md:max-h-full">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl md:text-4xl font-bold text-black">Happy Birthday!</CardTitle>
            <CardDescription className="text-xl  md:text-2xl font-semibold text-black">Annas</CardDescription>
            <p className="text-md md:text-xl text-black">June 24th</p>
          </CardHeader>

          <CardContent className="space-y-6 text-center">
            <div>
              <h3 className="text-md md:text-lg font-semibold text-black mb-2">Light the candles:</h3>
              <div className="flex justify-center space-x-2">
                {[...Array(totalCandles)].map((_, index) => (
                  <AnimatePresence key={index}>
                    {(celebration && index <= candlesLit) || (!celebration && index < candlesLit) ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.5, delay: celebration ? index * 0.5 : 0 }}
                      >
                        <FaBirthdayCake
                          className="w-7 h-7 md:w-8 md:h-8 transition-transform duration-300 cursor-pointer hover:scale-110"
                          style={{ color: candleColors[index % candleColors.length] }}
                          onClick={() => lightCandle(index)}
                        />
                      </motion.div>
                    ) : (
                      <FaBirthdayCake
                        className="w-7 h-7 md:w-8 md:h-8 text-gray-300 cursor-pointer hover:scale-110"
                        onClick={() => lightCandle(index)}
                      />
                    )}
                  </AnimatePresence>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-md md:text-lg font-semibold text-black mb-2">Pop the balloons:</h3>
              <div className="flex justify-center space-x-2">
                {[...Array(totalBalloons)].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 1 }}
                    animate={{ scale: index < balloonsPoppedCount ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <GiBalloons
                      className="w-7 h-7 md:w-8 md:h-8 cursor-pointer hover:scale-110"
                      style={{
                        color: index < balloonsPoppedCount
                          ? '#D1D5DB'
                          : balloonsColors[index % balloonsColors.length]
                      }}
                      onClick={() => popBalloon(index)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-center">
            <Button
              className="bg-black text-white hover:bg-gray-800 transition-all duration-300"
              onClick={celebrate}
              disabled={celebration}
            >
              Celebrate! <FaGift className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>

          <p className="text-15px md:text-lg font-semibold text-black text-center mb-4">
            Build with ❤️ By Muhammad Annas
          </p>
        </Card>
      </motion.div>

      {showConfetti && (
        <DynamicConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          colors={confettiColors}
        />
      )}
    </div>
  )
}

export default BirthdayWish
