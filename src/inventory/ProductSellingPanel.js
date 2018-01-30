import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Background from '../img/541.jpg';
import Avatar from 'material-ui/Avatar';
import { withStyles } from 'material-ui/styles';
import keycode from 'keycode';
import Table, {
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import DeleteIcon from 'material-ui-icons/Delete';
import FilterListIcon from 'material-ui-icons/FilterList';

import server from "../constants";
import request from "superagent/superagent";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

let counter = 0;
function createData( price, brand, model, name, color, picture, category, quantity) {
    counter += 1;
    return { id: counter, price, brand, model, name, color, picture, category, quantity };
}

const columnData = [
    { id: 'price', numeric: false, disablePadding: true, label: 'Price' },
    { id: 'brand', numeric: false, disablePadding: true, label: 'Brand' },
    { id: 'model', numeric: true, disablePadding: false, label: 'Model' },
    { id: 'name', numeric: true, disablePadding: false, label: 'Name' },
    { id: 'color', numeric: true, disablePadding: false, label: 'Color' },
    { id: 'picture', numeric: true, disablePadding: false, label: 'Picture' },
    { id: 'category', numeric: true, disablePadding: false, label: 'Category' },
    { id: 'quantity', numeric: true, disablePadding: false, label: 'Quantity' },
];

class EnhancedTableHead extends React.Component {
    static propTypes = {
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.string.isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
    };

    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

        return (
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                      indeterminate={numSelected > 0 && numSelected < rowCount}
                      checked={numSelected === rowCount}
                      onChange={onSelectAllClick}
                  />
                </TableCell>
                  {columnData.map(column => {
                      return (
                          <TableCell
                              key={column.id}
                              numeric={column.numeric}
                              padding={column.disablePadding ? 'none' : 'default'}
                              sortDirection={orderBy === column.id ? order : false}
                          >
                            <Tooltip
                                title="Sort"
                                placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                                enterDelay={300}
                            >
                              <TableSortLabel
                                  active={orderBy === column.id}
                                  direction={order}
                                  onClick={this.createSortHandler(column.id)}
                              >
                                  {column.label}
                              </TableSortLabel>
                            </Tooltip>
                          </TableCell>
                      );
                  }, this)}
              </TableRow>
            </TableHead>
        );
    }
}

const toolbarStyles = theme => ({
    root: {
        paddingRight: 2,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.A700,
                backgroundColor: theme.palette.secondary.A100,
            }
            : {
                color: theme.palette.secondary.A100,
                backgroundColor: theme.palette.secondary.A700,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
});

let EnhancedTableToolbar = props => {
    const { numSelected, classes } = props;

    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
          <div className={classes.title}>
              {numSelected > 0 ? (
                  <Typography type="subheading">{numSelected} selected</Typography>
              ) : (
                  <Typography type="title">Items Table</Typography>
              )}
          </div>
          <div className={classes.spacer} />
          <div className={classes.actions}>
              {numSelected > 0 ? (
                  <Tooltip title="Delete">
                    <IconButton aria-label="Delete">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
              ) : (
                  <Tooltip title="Filter list">
                    <IconButton aria-label="Filter list">
                      <FilterListIcon />
                    </IconButton>
                  </Tooltip>
              )}
          </div>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 800,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class EnhancedTable extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            order: 'asc',
            orderBy: 'calories',
            product: [],
            selected: [],
            data : [].sort((a, b) => (a.calories < b.calories ? -1 : 1)),
            page: 0,
            rowsPerPage: 5,
            display: 'block'
        };
    }
    componentWillMount(){
      if(cookies.get('accessToken').accessToken){
        let accessToken = cookies.get('accessToken').accessToken;
        let shop = window.location.href.split('?')[1].split('=')[1].split('&')[0];
        request.get(`${server.path}/api/Products?filter=%7B%22where%22%3A%7B%22shopId%22%3A%22${shop}%22%7D%7D&access_token=${accessToken}`).
        end((err, products) => {
          if(products.statusCode === 200){
            this.setState({
                data : products.body
            });
            if(products.body.length < this.state.rowsPerPage) {
              this.setState({
                  display: "none"
              });
            }
          } else {
            alert('Ooops! Nothing Found');
          }
        });
      } else {
        window.location.href = '/';
      }
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        const data =
            order === 'desc'
                ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
                : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

        this.setState({ data, order, orderBy });
    };

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState({ selected: this.state.data.map(n => n.id) });
            return;
        }
        this.setState({ selected: [] });
    };

    handleKeyDown = (event, id) => {
        if (keycode(event) === 'space') {
            this.handleClick(event, id);
        }
    };

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
        let url = window.location.href.split('&')[0] + '&' + newSelected;
        if(window.location.href.search('status=') !== -1){
          url += `&status=${window.location.href.split('&status=')[1]}`;
        }
        window.history.pushState('page2', 'Title', url);
    };
    saveProductCokkies = (id, description) => event => {
        //console.log(id, event.target.value, this.state.product);
        let product = this.state.product;
        if(product.length < 1) {
            product.push({productId: id, quantity: event.target.value});
            this.setState({
                product: product
            });
        } else {
            product.map((o, i) => {
                if (o.productId == id) {
                    return product[i].quantity = event.target.value; // stop searching
                } else {
                    return product.push({productId: id, quantity: event.target.value});
                }
            });
            this.setState({
                product: product
            });
            console.log(product);
        }
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const { classes } = this.props;
        const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <Paper className={classes.root}>
              <EnhancedTableToolbar numSelected={selected.length} />
              <div className={classes.tableWrapper}>
                <Table className={classes.table}>
                  <EnhancedTableHead
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onSelectAllClick={this.handleSelectAllClick}
                      onRequestSort={this.handleRequestSort}
                      rowCount={data.length}
                  />
                  <TableBody>
                      {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                          const isSelected = this.isSelected(n.id);
                          return (
                              <TableRow
                                  hover
                                  onClick={event => this.handleClick(event, n.id)}
                                  onKeyDown={event => this.handleKeyDown(event, n.id)}
                                  role="checkbox"
                                  aria-checked={isSelected}
                                  tabIndex={-1}
                                  key={n.id}
                                  selected={isSelected}
                              >
                                <TableCell padding="checkbox">
                                  <Checkbox checked={isSelected} />
                                </TableCell>
                                <TableCell padding="none">{n.salePrice}</TableCell>
                                <TableCell numeric>{n.brand}</TableCell>
                                <TableCell numeric>{n.model}</TableCell>
                                <TableCell numeric>{n.name}</TableCell>
                                <TableCell numeric>{n.color}</TableCell>
                                <TableCell numeric><Avatar style={{width:72, height:72}} src={n.image}/></TableCell>
                                <TableCell numeric>{n.category}</TableCell>
                                <TableCell numeric>{n.quantity}</TableCell>
                                  <TextField
                                      id="search"
                                      label="Quantity"
                                      type="text"
                                      margin="normal"
                                      onChange={this.saveProductCokkies(n.id)}
                                      style={{width: '100%'}}
                                  />
                              </TableRow>
                          );
                      })}
                      {emptyRows > 0 && (
                          <TableRow style={{ height: 49 * emptyRows }}>
                            <TableCell colSpan={6} />
                          </TableRow>
                      )}
                  </TableBody>
                  <TableFooter>
                    <TableRow style={{display: this.state.display}}>
                      <TablePagination
                          count={data.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onChangePage={this.handleChangePage}
                          onChangeRowsPerPage={this.handleChangeRowsPerPage}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
            </Paper>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);