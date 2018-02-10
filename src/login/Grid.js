import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { GridListTile, GridListTileBar } from 'material-ui/GridList';
import tileData from './tileData';
import { Link } from 'react-router-dom';
import Grid from 'material-ui/Grid';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    background: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
});

function TitlebarGridList(props) {
  return (
    <div>
      <Grid spacing='40' container justify="center" style={{width:'100%', margin:0}}>
        {tileData.map(tile => (
          <Grid item xs={10} sm={8} lg={5}>
            <GridListTile key={tile.img} cols={3} rows={1.5} style={{listStyle:'none'}}>
              <Link to='/Shop'><img src={tile.img} alt={tile.title} width="100%" height="100%" />
                <GridListTileBar
                  title={tile.title}
                  subtitle={<span>{tile.address}</span>}
                  style={{textAlign:'left'}}
                /></Link>
            </GridListTile>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

TitlebarGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TitlebarGridList);