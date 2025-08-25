// src/App.jsx
import { useState } from 'react'

function App() {
  // Step 4a: State for our game
  const [numbers, setNumbers] = useState([0, 0, 0])
  const [message, setMessage] = useState("Click to play!")
  const [wins, setWins] = useState(0)
  const [winType, setWinType] = useState("") // New: track type of win
  const [isGenerating, setIsGenerating] = useState(false) // New: loading state

  // Step 4b: Function to generate random numbers with animation
  const generateNumbers = () => {
    setIsGenerating(true) // Show loading state
    setWinType("") // Reset win type
    setMessage("🎲 Rolling numbers...")

    // Simulate rolling animation with delay
    setTimeout(() => {
      // Create 3 random numbers between 0-9
      const newNumbers = [
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10)
      ]
      
      setNumbers(newNumbers)
      
      // Step 4c: Check for TWO different win conditions
      const allSame = newNumbers[0] === newNumbers[1] && newNumbers[1] === newNumbers[2]
      const sumIs15 = newNumbers[0] + newNumbers[1] + newNumbers[2] === 15
      
      if (allSame) {
        setMessage("🎉 JACKPOT! All numbers match!")
        setWinType("jackpot")
        setWins(wins + 1)
      } else if (sumIs15) {
        setMessage("⭐ BONUS WIN! Numbers add up to 15!")
        setWinType("bonus")
        setWins(wins + 1)
      } else {
        setMessage("Try again! Get all same numbers OR numbers that add to 15!")
        setWinType("")
      }
      
      setIsGenerating(false)
    }, 1000) // 1 second delay for animation effect
  }

  // Step 4d: Calculate the sum for display
  const currentSum = numbers[0] + numbers[1] + numbers[2]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      
      {/* Step 4e: Main game container */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        
        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          🎰 Lottery Game
        </h1>
        
        <p className="text-gray-600 mb-8">
          Win with matching numbers OR sum of 15!
        </p>

        {/* Step 4f: Lottery numbers display */}
        <div className="flex justify-center gap-4 mb-6">
          {numbers.map((number, index) => (
            <div
              key={index}
              className={`
                w-20 h-20 rounded-2xl border-4 flex items-center justify-center
                text-3xl font-bold text-gray-800 transition-all duration-300
                ${isGenerating ? 'border-yellow-400 bg-yellow-50 animate-pulse' : ''}
                ${winType === 'jackpot' ? 'border-green-500 bg-green-100 winner-glow' : ''}
                ${winType === 'bonus' ? 'border-blue-500 bg-blue-100 winner-glow' : ''}
                ${!winType && !isGenerating ? 'border-gray-300 bg-gray-50' : ''}
                bounce-in
              `}
            >
              {number}
            </div>
          ))}
        </div>

        {/* Step 4g: Show current sum */}
        <div className="mb-6 p-3 bg-gray-100 rounded-xl">
          <p className="text-gray-600">
            Current sum: <span className="font-bold text-2xl text-gray-800">{currentSum}</span>
          </p>
        </div>

        {/* Step 4h: Generate button */}
        <button
          onClick={generateNumbers}
          disabled={isGenerating}
          className={`
            w-full py-4 px-6 rounded-2xl text-white font-bold text-lg
            transition-all duration-300 transform
            ${isGenerating 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:scale-105 shadow-lg hover:shadow-xl'
            }
          `}
        >
          {isGenerating ? '🎲 Rolling...' : '🎲 Generate Numbers'}
        </button>

        {/* Step 4i: Win/lose message */}
        <div className={`
          mt-6 p-4 rounded-2xl font-bold text-lg transition-all duration-300
          ${winType === 'jackpot' ? 'bg-green-100 text-green-800 border-2 border-green-300' : ''}
          ${winType === 'bonus' ? 'bg-blue-100 text-blue-800 border-2 border-blue-300' : ''}
          ${!winType ? 'bg-gray-100 text-gray-700 border-2 border-gray-300' : ''}
        `}>
          {message}
        </div>

        {/* Step 4j: Win counter */}
        <div className="mt-6 flex justify-between items-center bg-gray-50 rounded-2xl p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{wins}</p>
            <p className="text-gray-600 text-sm">Total Wins</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-pink-600">{currentSum}</p>
            <p className="text-gray-600 text-sm">Current Sum</p>
          </div>
        </div>

        {/* Step 4k: Game rules */}
        <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border-2 border-yellow-200">
          <h3 className="font-bold text-gray-800 mb-2">🏆 How to Win:</h3>
          <ul className="text-left text-gray-700 space-y-1">
            <li>• <span className="font-semibold text-green-600">JACKPOT:</span> All 3 numbers are the same</li>
            <li>• <span className="font-semibold text-blue-600">BONUS:</span> Numbers add up to exactly 15</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
