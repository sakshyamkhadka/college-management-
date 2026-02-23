import React from 'react';

const Map = () => {
  return (
    <div style={{ width: '100vw', height: '450px' }}>
      <iframe
        title="Pascal National College Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4522.061545642825!2d85.32408446928392!3d27.65891820901568!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19ca783dc9d3%3A0x7bec8ddcf2aa3c2b!2sPascal%20National%20College!5e0!3m2!1sen!2snp!4v1764228413895!5m2!1sen!2snp"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Map;
