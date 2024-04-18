import React from 'react';
import ReactiveAppBar from './ReactiveAppBar.js';

export default function Header({ name }) {
  return (
    <div>
  <ReactiveAppBar/>
  </div>
  
    /* <AppBar position="static">
      <Toolbar>
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                
              </Grid>
              <Grid item>
                <Typography variant="h6">{name}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                <Link href="/" color="inherit">
                  Home
                </Link>
              </Grid>
              <Grid item>
                <Link href="/posts/About-Us" color="inherit">
                  Conocenos
                </Link>
              </Grid>
              <Grid item>
                <Link href="/project" color="inherit">
                  Nuestras Bicicletas
                </Link>
              </Grid>
              <Grid item>
                <Link href="/" color="inherit">
                  FAQ
                </Link>
              </Grid>
              <Grid item>
                <Link href="/posts/Donations" color="inherit">
                  ¿Como ayudar?
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>*/
  );
}
