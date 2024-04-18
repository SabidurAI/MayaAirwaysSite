import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Papa from 'papaparse';

export default function Carousel({ googleSheetUrl }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState('');

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

  const handleSelectChange = (event) => {
    setSelectedProject(event.target.value);
    setCurrentIndex(projects.findIndex(project => project.image_name === event.target.value));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="carousel" style={{ paddingTop: '20px' }}>
      {projects.length > 0 && (
        <div style={{ maxWidth: '800px', margin: '10 auto' }}>
          <FormControl fullWidth>
            <InputLabel id="project-select-label" style={{ paddingTop: '10px' }}>Seleccionar una Bicicleta</InputLabel>
            <Select
              labelId="project-select-label"
              id="project-select"
              value={selectedProject}
              onChange={handleSelectChange}
            >
              {projects.map((project, index) => (
                <MenuItem key={index} value={project.image_name}>{project.image_name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Card style={{ backgroundColor: 'transparent', marginTop: '20px' }}>
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
      <Button onClick={handlePrev} variant="contained" color="primary" style={{ marginTop: '20px' }}>
        Anterior
      </Button>
      <Button onClick={handleNext} variant="contained" color="primary" style={{ marginTop: '20px', marginLeft: '10px' }}>
        Siguiente
      </Button>
    </div>
  );
}
