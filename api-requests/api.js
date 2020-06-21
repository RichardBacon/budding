import axios from 'axios';

const baseURL = 'https://budding-back-end.herokuapp.com/api';

export const getUsers = () => {
  return axios.get(`${baseURL}/users`).then(({ data }) => {
    return data.users;
  });
};

export const getUserByUsername = (username) => {
  return axios.get(`${baseURL}/users/${username}`).then(({ data }) => {
    console.log(data, '<--- received data');
    return data.user;
  });
};

export const postUser = (username, name) => {
  return axios
    .post(`${baseURL}/users/`, { username, name })
    .then(({ data }) => {
      return data.user;
    });
};

export const getPlantsByUserId = (user_id, order, sort_by, plant_type) => {
  return axios
    .get(`${baseURL}/users/${user_id}/plants`, {
      params: { order, sort_by, plant_type },
    })
    .then(({ data }) => {
      return data.plants;
    });
};

export const postPlant = (
  user_id,
  plant_name,
  plant_type,
  soil,
  sunlight,
  location,
  watering_freq,
  plant_variety,
  pot_height,
) => {
  return axios
    .post(`${baseURL}/users/${user_id}/plants`, {
      plant_name,
      plant_type,
      soil,
      sunlight,
      location,
      watering_freq,
      plant_variety,
      pot_height,
    })
    .then(({ data }) => {
      return data.plant;
    });
};

export const getPlantById = (plant_id) => {
  return axios.get(`${baseURL}/plants/${plant_id}`).then(({ data }) => {
    return data.plant;
  });
};

export const patchPlantById = (
  plant_id,
  plant_name,
  plant_type,
  soil,
  sunlight,
  location,
  watering_freq,
  plant_variety,
  pot_height,
) => {
  return axios
    .patch(`${baseURL}/plants/${plant_id}`, {
      plant_name,
      plant_type,
      soil,
      sunlight,
      location,
      watering_freq,
      plant_variety,
      pot_height,
    })
    .then(({status, data: {plant}}) => {
      return {status, plant}
    });
};

export const deletePlantById = (plant_id) => {
  return axios.delete(`${baseURL}/plants/${plant_id}`).then((response) => {return response})
};

export const getSnapshotsByPlantId = (plant_id) => {
  return axios
    .get(`${baseURL}/plants/${plant_id}/snapshots`)
    .then(({ data }) => {
      return data.snaps;
    });
};

export const postSnapshot = (plant_id, plant_uri, height) => {
  return axios
    .post(`${baseURL}/plants/${plant_id}/snapshots`, {
      plant_uri,
      height,
    })
    .then(({ data }) => {
      return data.snap;
    });
};

export const deleteSnapshotById = (snapshot_id) => {
  return axios.delete(`${baseURL}/snapshots/${snapshot_id}`);
};
