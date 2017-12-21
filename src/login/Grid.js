import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList';
import tileData from './tileData';
import { Link } from 'react-router-dom';

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
      <GridList cellHeight={180} cols={6} spacing={100} style={{margin:0, justifyContent:'center'}}>
        {tileData.map(tile => (
          <GridListTile key={tile.img} cols={2} rows={1.5}>
          <Link to='/Shop'><img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>{tile.address}</span>}
              style={{textAlign:'left'}}
            /></Link>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

TitlebarGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TitlebarGridList);