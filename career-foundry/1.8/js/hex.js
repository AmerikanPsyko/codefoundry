// js is just for generating the svg line
// you can just copy the outcome of it

const DUR = 707;
const Points = [
  ["1.5", "0.4"],
  ["0", "3"],
  ["1.5", "5.6"],
  ["4.5", "5.6"],
  ["6", "3"],
  ["4.5", "0.4"]
];

let lines = Points.map((p, idx, ps) => {
  let x1, y1, x2, y2, p2, begin, begin2;
  let beginReset1, begin2hide;
  const end = ps.length - 1;
  if (idx === end) p2 = Points.at(0);
  else p2 = Points.at(idx + 1);

  begin = idx === 0 ? `0;a2${end}.end` : `a1${idx - 1}.end`;
  begin2 = idx === 0 ? `a1${end}.end` : `a2${idx - 1}.end`;
  begin2hide = `a2${idx}.end`;
  beginReset1 = idx === 0 ? `a2${end}.end` : `a1${idx - 1}.end`;

  x1 = p[0];
  y1 = p[1];
  x2 = p2[0];
  y2 = p2[1];

  return `<line 
    x1="${x1}" y1="${y1}" 
    x2="${x1}" y2="${y1}" 
    visibility="hidden">
    
    
    
    <animate
        attributeName='visibility'
        values='visible'
        dur='0s'
        begin='${begin}'
        fill='freeze'
    />

    <animate
        id='a1${idx}'
        attributeName='x2'
        values='${x1};${x2}'
        dur='${DUR}ms'
        begin='${begin}'
        fill='freeze'
        calcMode='spline'
        keyTimes='0; 1'
        keySplines='0.35, 0.18, 0.2, 1.0'
    />

    <animate
        attributeName='y2'
        values='${y1};${y2}'
        dur='${DUR}ms'
        begin='${begin}'
        fill='freeze'
        calcMode='spline'
        keyTimes='0; 1'
        keySplines='0.35, 0.18, 0.2, 1.0'
    />
    
    
    
    
    
    
    <animate
        attributeName='x1'
        values='${x1}'
        dur='0s'
        begin='${beginReset1}'
    />
    <animate
        attributeName='y1'
        values='${y1}'
        dur='0s'
        begin='${beginReset1}'
    />
    
    
    
    <animate
        attributeName='visibility'
        values='hidden'
        dur='0s'
        begin='${begin2hide}'
        fill='freeze'
    />
    
    
    <animate
      id='a2${idx}'
      attributeName='x1'
      values='${x1};${x2}'
      dur='${DUR}ms'
      begin='${begin2}'
      fill='freeze'
      calcMode='spline'
        keyTimes='0; 1'
        keySplines='0.35, 0.18, 0.2, 1.0'
    />
    
    

    <animate
      attributeName='y1'
      values='${y1};${y2}'
      dur='${DUR}ms'
      begin='${begin2}' 
      fill='freeze'
      calcMode='spline'
        keyTimes='0; 1'
        keySplines='0.35, 0.18, 0.2, 1.0'
    />

</line>`;
});

document.getElementById("GG").innerHTML = lines.join("");
