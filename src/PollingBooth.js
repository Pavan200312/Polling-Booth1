import React, { useState } from 'react';
import './PollingBooth.css';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const PollingBooth = () => {
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [votingFinalized, setVotingFinalized] = useState(false);
  const [totalVotes, setTotalVotes] = useState(0);

  const initialCandidates = [
    { name: 'Ram Charan', image: 'https://c.ndtvimg.com/gws/ms/ram-charans-fantastic-hairstyles/assets/8.jpeg?1673957600', votes: 0 },
    { name: 'Pawan Kalyan', image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR7vQhytuDeXwAyIaB0PvfF90dXPTMzHSf_ISfBDsX5hrLKyiAz', votes: 0 },
    { name: 'NTR', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRceOu7rFHpWehieX69tXUb0PsuZ6iW7Ujn_g&s', votes: 0 },
    { name: 'Ravi Teja', image: 'https://i.pinimg.com/originals/08/75/1f/08751f0f5d1c5dfa70e43c2cb59eb3f7.jpg', votes: 0 }
  ];

  const [candidates, setCandidates] = useState(initialCandidates);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCandidate) {
      const updatedCandidates = candidates.map(candidate =>
        candidate.name === selectedCandidate
          ? { ...candidate, votes: candidate.votes + 1 }
          : candidate
      );
      setCandidates(updatedCandidates);
      setTotalVotes(totalVotes + 1);
      setSubmitted(true);
    }
  };

  const finalizeVoting = () => {
    setVotingFinalized(true);
  };

  const handleNewVote = () => {
    setSelectedCandidate('');
    setSubmitted(false);
  };

  const chartData = {
    labels: candidates.map(candidate => candidate.name),
    datasets: [
      {
        label: 'Number of Votes',
        data: candidates.map(candidate => candidate.votes),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const getWinner = () => {
    const winner = candidates.reduce((max, candidate) =>
      candidate.votes > max.votes ? candidate : max
    );
    return winner;
  };

  return (
    <div className="polling-booth">
      <h1>Heroes Polling Booth</h1>
      {!votingFinalized ? (
        <>
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <div className="candidates">
                {candidates.map((candidate, index) => (
                  <div key={index} className="candidate">
                    <input
                      type="radio"
                      id={candidate.name}
                      name="candidate"
                      value={candidate.name}
                      onChange={(e) => setSelectedCandidate(e.target.value)}
                    />
                    <label htmlFor={candidate.name}>
                      <img src={candidate.image} alt={candidate.name} className="candidate-image" />
                      {candidate.name}
                    </label>
                  </div>
                ))}
              </div>
              <button type="submit">Submit Vote</button>
            </form>
          ) : (
            <div className="thank-you">
              <h2>Thank you for voting!</h2>
              <p>You voted for: {selectedCandidate}</p>
              <button onClick={handleNewVote}>Vote Again</button>
              <button onClick={finalizeVoting}>Finalize Voting</button>
            </div>
          )}
        </>
      ) : (
        <div className="final-results">
          <h2>Voting Results</h2>
          <div className="chart-container">
            <Pie data={chartData} />
          </div>
          <div className="votes-container">
            {candidates.map((candidate, index) => (
              <div key={index} className="candidate-votes">
                <span>{candidate.name}:</span>
                <span>{candidate.votes} votes</span>
              </div>
            ))}
          </div>
          <p>Total Votes: {totalVotes}</p>
          <div className="winner">
            <h3>Winner</h3>
            <div className="winner-details">
              <img src={getWinner().image} alt={getWinner().name} className="winner-image" />
              <p>{getWinner().name}</p>
              <p>{getWinner().votes} votes</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PollingBooth;
