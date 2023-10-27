import { render, screen } from '@testing-library/react';
import App from './App';
import MessageScreen from './components/MessageScreen';

//test('renders learn react link', () => {
  /*render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();*/
//});

test('Render MessageScreen', () => {
  const start = Date.now();
  render(<MessageScreen />);
  const timeTaken = Date.now()-start;
  //expect(timeTaken).toBeLessThan(200);
  if(timeTaken>50){
    throw Error('Took too long, ' + timeTaken);
  }
});
