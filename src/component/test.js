import React, { useState } from 'react';

const App = () => {
  const [content, setContent] = useState('');

  const transformText = (text) => {
    // "해가 뜨고 난후"를 "해가 지고 난후"로 변환
    const transformedText = text.replace("해가 뜨고 난후", "해가 지고 난후");
    return transformedText;
  };

  const handleInputChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div>
      <textarea
        id="content"
        value={content}
        onChange={handleInputChange}
        rows={5}
      />
      <div className="output-section">
        {transformText(content)}
      </div>
    </div>
  );
};

export default App;