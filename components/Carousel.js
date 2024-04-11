import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import Papa from 'papaparse';

export default function Carousel({ googleSheetUrl }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(googleSheetUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const csvData = await response.text();
        const { data } = Papa.parse(csvData, { header: true });
        setProjects(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [googleSheetUrl]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === projects.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? projects.length - 1 : prevIndex - 1));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="carousel">
      
      {projects.length > 0 && (
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={projects[currentIndex].image_url} alt={`Project ${currentIndex + 1}`} />
          <Card.Body>
            <Card.Title>{projects[currentIndex].image_name}</Card.Title>
            <Card.Text>{projects[currentIndex].description}</Card.Text>
          </Card.Body>
        </Card>
      )}
      <button onClick={handlePrev}>Previous</button>
      <br/>
      <button onClick={handleNext}>Next</button>
    </div>
  );
}
