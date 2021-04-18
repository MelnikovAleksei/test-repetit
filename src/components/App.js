import React from 'react';
import Filter from './Filter';

function App() {

  const handleSubmit = (data) => {
    console.log(data);
  }

  return (
    <section>
      <Filter
        onSubmit={handleSubmit}
      />
    </section>
  );
}

export default App;
