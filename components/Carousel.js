import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Button, Typography } from '@mui/material';
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
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Card style={{ backgroundColor: 'transparent' }}>
            <CardMedia
              component="img"
              height="140"
              image={projects[currentIndex].image_url}
              alt={`Project ${currentIndex + 1}`}
              style={{ backgroundColor: 'transparent' }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {projects[currentIndex].image_name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {projects[currentIndex].description}
              </Typography>
            </CardContent>
          </Card>
        </div>
      )}
      <Button onClick={handlePrev} variant="contained" color="primary">
        Anterior
      </Button>
      <Button onClick={handleNext} variant="contained" color="primary">
        Siguiente
      </Button>
    </div>
  );
}
