// components/Reward.jsx
import React, { useEffect, useState } from "react";

export default function Reward({ applyReward }) {
  const [rewards, setRewards] = useState([]);
  const [selectedReward, setSelectedReward] = useState(0);

  useEffect(() => {
    const savedRewards = JSON.parse(localStorage.getItem("rewards")) || [];
    // Only show unused rewards
    const unusedRewards = savedRewards.filter((r) => !r.used);
    setRewards(unusedRewards);
  }, []);

  const handleUseReward = (reward) => {
    setSelectedReward(reward.amount);
    applyReward(reward.amount);
  };

  return rewards.length > 0 ? (
    <div className="border p-3 rounded mb-2">
      <h4 className="font-semibold mb-2">Available Rewards</h4>
      <div className="flex flex-wrap gap-2">
        {rewards.map((r) => (
          <button
            key={r.id}
            onClick={() => handleUseReward(r)}
            className={`px-3 py-1 rounded border ${
              selectedReward === r.amount ? "bg-green-600 text-white" : "bg-gray-200"
            }`}
          >
            ₹{r.amount} Cashback
          </button>
        ))}
      </div>
    </div>
  ) : null;
}
