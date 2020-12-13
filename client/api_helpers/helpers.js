import axios from 'axios';


// get a specific listing
export var getListing = (id) => {
  return axios.get(`/api/more/listings/${id}`)
    .then(results => {
      return ([id, results.data]);
    })
    .catch(err => {
      console.log(err);
    });
};

export var getUser = (id) => {
  return axios.get(`/api/more/users/${id}/favorites`)
    .then(results => {
      return ([id, results.data[1]]);
    })
    .catch(err => {
      console.log(err);
    });
};


