import './examples.less';

import { createHistory } from 'history';

const history = createHistory();
const router = {};

const examples = 7;
let count = 1;

const nav = ({pathname}) => {
  const route = router[pathname] || router[Object.keys(router)[0]];
  if (route){
    route.init('#myGrid');
    document.title = route.title;
  }
};

history.listen(nav);

while (count <= examples){
  const example = require(`./example${count}`).default;
  router[example.route] = example;

  const link = document.createElement('a');
  link.href = '#';
  link.className = 'demo-link';
  link.innerHTML = example.title;
  link.addEventListener('click', e => {
    e.preventDefault();
    history.push({
      pathname: example.route,
      state: {
        title: example.title
      }
    });
  });

  document.body.appendChild(link);

  count++;
}

nav(history.getCurrentLocation());

