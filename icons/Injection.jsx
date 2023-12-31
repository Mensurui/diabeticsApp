import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Injection(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      style={{
        enableBackground: "new 0 0 64 64",
        marginLeft:40,
        marginTop:20,
        marginBottom:-90,
      }}
      viewBox="0 0 64 80"
      width={320} // Set the desired width here (e.g., 32)
      height={400} // Set the desired height here (e.g., 40)
      p
      {...props}
    >
      <Path d="M59.172 23c-.065 0-.126.015-.19.019.003-.064.018-.126.018-.19A3.833 3.833 0 0 0 55.172 19c-.065 0-.126.015-.19.019.003-.064.018-.126.018-.19 0-1.737-1.17-3.19-2.757-3.657l7.636-7.636A3.806 3.806 0 0 0 61 4.829 3.833 3.833 0 0 0 57.172 1a3.8 3.8 0 0 0-2.707 1.122l-3.179 3.179A2.959 2.959 0 0 0 50 5H39V1H8C4.141 1 1 4.14 1 8s3.141 7 7 7h31v-4h6.586l-6.139 6.139A5.863 5.863 0 0 0 36 16a5.868 5.868 0 0 0-4.121 1.707l-3.527 3.527a10.985 10.985 0 0 0-2.959 5.388l-1.306 5.877L20 36.586l-2-2L6.586 46 24 63.414 35.414 52l-2-2 3.079-3.079 6.734-1.347a10.961 10.961 0 0 0 5.62-3.008l2.688-2.688 1.172-1.172 9.172-9.172A3.798 3.798 0 0 0 63 26.829 3.833 3.833 0 0 0 59.172 23zm-4-2a1.83 1.83 0 0 1 1.293 3.122L46.121 34.465a1.83 1.83 0 0 1-2.586-2.586l.907-.906a3.811 3.811 0 0 0 3.531-3.531l5.906-5.906A1.839 1.839 0 0 1 55.172 21zm-15.668 6.917 1.961 1.961c.213.213.451.388.7.543l-.044.044A1.83 1.83 0 0 1 39 29.171c0-.471.181-.913.504-1.254zM51.172 17a1.83 1.83 0 0 1 1.293 3.122l-5.044 5.043a3.877 3.877 0 0 0-.542-.701L44.914 22.5l4.965-4.965c.341-.34.811-.535 1.293-.535zM3 8c0-2.757 2.243-5 5-5h25v10H8c-2.757 0-5-2.243-5-5zm0 4a1.001 1.001 0 0 1 0-2 1.001 1.001 0 0 1 0 2z" fill="#241468" />
      {/* Add your custom text or other SVG elements here */}
    </Svg>
  );
}
