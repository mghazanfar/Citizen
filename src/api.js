import request from "../node_modules/superagent/superagent";
import server from "constants";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const getCategories = () => {
    const url = server.path+'/api/Categories?access_token='+cookies.get('accessToken');
    request
      .get(url)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .end((err, res) => {
        if (res.status === 200) {
            console.log(res.body);
          return res.body;
        }
      });
}

//exports default getCategories;