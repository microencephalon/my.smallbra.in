import React from 'react';

const SmallBrainIcon = ({ color }) => (
  <svg
    width='20'
    height='auto'
    viewBox='1 0 32 32'
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
    xmlSpace='preserve'
    xmlnsSerif='http://www.serif.com/'
    style={{
      fill: color ? color : '#141414',
      fillRrule: 'evenodd',
      clipRule: 'evenodd',
      strokeLinejoin: 'round',
      strokeMiterlimit: '2',
    }}
  >
    <g transform='matrix(0.104614,0,0,0.104614,-2.01782,-16.6596)'>
      <g transform='matrix(0.661326,0,0,0.661326,-59.2329,127.023)'>
        <path
          d='M336.61,438.684L336.61,93.14L336.348,93.14C331.645,69.425 310.778,52.242 286.559,52.242C264.981,52.242 246.551,65.801 239.215,84.816C233.559,82.953 227.555,81.937 221.383,81.937C189.934,81.937 164.348,107.523 164.348,138.972C164.348,147.046 166.055,154.874 169.282,162.113C142.805,170.976 123.653,195.957 123.653,225.379C123.653,239.817 128.325,253.293 136.282,264.328C129.137,275.137 125.239,287.785 125.239,300.945C125.239,327.949 141.45,351.215 164.634,361.617C159.743,369.492 156.974,378.625 156.974,388.207C156.974,413.637 175.896,434.68 200.392,438.125C200.38,438.617 200.329,439.109 200.329,439.602C200.329,477.184 230.903,507.754 268.485,507.754C306.067,507.754 336.641,477.184 336.641,439.602C336.641,439.293 336.598,438.992 336.59,438.684L336.61,438.684ZM268.485,485.352C243.251,485.352 222.727,464.832 222.727,439.598C222.727,438.426 222.93,437.278 223.02,436.11C235.082,432.196 245.469,423.88 251.739,412.399L232.083,401.669C227.153,410.68 217.72,416.278 207.45,416.278C191.973,416.278 179.376,403.676 179.376,388.2C179.376,380.129 182.833,372.595 188.739,367.313C189.751,367.356 190.743,367.465 191.763,367.465C209.931,367.465 227.044,360.016 239.404,347.34C243.146,348.235 247.025,348.762 251.037,348.762C255.154,348.762 259.263,348.246 263.252,347.242L257.779,325.519C255.58,326.078 253.31,326.359 251.037,326.359C235.814,326.359 223.435,313.976 223.435,298.75L223.462,297.481L201.083,296.617C201.056,297.328 201.032,298.039 201.032,298.75C201.032,313.703 207.661,327.102 218.091,336.266C210.591,341.856 201.407,345.059 191.767,345.059C167.435,345.059 147.646,325.262 147.646,300.938C147.646,293.684 149.432,286.676 152.744,280.391C161.244,286.227 171.158,290.196 181.967,291.579L184.799,269.356C162.717,266.544 146.065,247.633 146.065,225.376C146.065,200.927 165.956,181.036 190.405,181.036C202.038,181.036 212.917,185.521 221.061,193.348C210.803,202.805 204.327,216.313 204.327,231.332C204.327,232.852 204.401,234.363 204.53,235.875L226.839,233.91C226.761,233.055 226.722,232.192 226.722,231.336C226.722,215.156 239.882,202.004 256.054,202.004C259.55,202.004 262.976,202.614 266.245,203.828L274.034,182.828C268.265,180.684 262.218,179.602 256.054,179.602C250.796,179.602 245.722,180.403 240.941,181.864C228.929,167.864 211.738,159.532 193.05,158.798C188.96,152.958 186.769,146.126 186.769,138.974C186.769,119.872 202.304,104.337 221.406,104.337C226.582,104.337 231.535,105.547 236.027,107.653C236.039,107.743 236.039,107.837 236.042,107.926L236.585,107.876C244.582,111.786 250.983,118.7 254.069,127.458L275.198,120.016C271.89,110.637 266.249,102.551 259.104,96.25C262.155,83.875 273.268,74.641 286.573,74.641C299.905,74.641 311.374,83.989 314.225,96.942L314.225,434.902L314.018,434.926C314.182,436.476 314.261,438.035 314.261,439.598C314.245,464.832 293.722,485.352 268.488,485.352L268.485,485.352Z'
          style={{ fillRule: 'nonzero' }}
        />
      </g>
      <g transform='matrix(0.661326,0,0,0.661326,-59.2329,127.023)'>
        <path
          d='M576.35,225.38C576.35,195.88 557.588,170.958 530.807,162.118C533.928,155.005 535.651,147.177 535.651,138.977C535.651,107.528 510.069,81.942 478.608,81.942C472.42,81.942 466.413,82.934 460.776,84.774C453.436,65.778 435.014,52.243 413.471,52.243C389.233,52.243 368.409,69.411 363.713,93.141L363.381,93.141L363.381,438.681L363.404,438.681C363.404,438.99 363.35,439.29 363.35,439.599C363.35,477.181 393.932,507.751 431.514,507.751C469.096,507.751 499.666,477.181 499.666,439.599C499.666,439.107 499.623,438.615 499.611,438.122C524.099,434.677 543.021,413.634 543.021,388.204C543.021,378.646 540.349,369.466 535.439,361.583C558.584,351.149 574.751,327.915 574.751,300.946C574.751,287.438 570.681,274.88 563.747,264.38C571.985,252.954 576.349,239.478 576.349,225.384L576.35,225.38ZM508.245,345.06C502.921,345.06 497.679,344.076 492.745,342.228C499.503,326.302 496.132,307.193 483.12,294.638L467.569,310.759C475.257,318.173 475.889,330.404 469.003,338.587C461.913,347.009 449.554,348.321 440.874,341.56L427.128,359.244C434.967,365.337 444.226,368.298 453.409,368.298C462.202,368.298 470.909,365.545 478.28,360.244C487.518,364.904 497.78,367.451 508.253,367.451C509.272,367.451 510.253,367.337 511.26,367.298C517.217,372.623 520.647,380.15 520.647,388.185C520.647,403.662 508.057,416.263 492.581,416.263C490.48,416.263 488.413,415.955 486.394,415.506C489.632,409.896 491.581,403.432 491.796,396.479L469.405,395.756C469.096,405.533 461.19,413.19 451.413,413.19C445.507,413.19 439.972,410.28 436.601,405.424L418.183,418.174C425.73,429.076 438.152,435.584 451.413,435.584C457.3,435.584 462.866,434.315 467.893,432.084C470.803,433.725 473.846,435.069 477.002,436.1C477.092,437.26 477.287,438.408 477.287,439.576C477.287,464.81 456.767,485.33 431.533,485.33C406.299,485.33 385.771,464.81 385.771,439.576C385.771,437.807 385.885,436.01 386.092,434.241L385.807,434.205L385.799,97.155C388.553,84.085 400.061,74.643 413.479,74.643C426.733,74.643 437.815,83.839 440.889,96.163C438.111,98.617 435.576,101.367 433.299,104.343C432.928,104.331 432.553,104.288 432.186,104.288C415.155,104.288 400.651,116.456 397.702,133.229L419.761,137.116C420.819,131.073 426.05,126.69 432.187,126.69C439.144,126.69 444.808,132.35 444.808,139.311C444.808,139.987 444.753,140.667 444.644,141.335L466.738,145.018C467.046,143.155 467.206,141.233 467.206,139.307C467.206,128.959 462.663,119.678 455.515,113.26C457.89,111.12 460.515,109.295 463.39,107.889L463.972,107.944C463.984,107.842 463.984,107.741 463.996,107.635C468.469,105.553 473.414,104.338 478.617,104.338C497.722,104.338 513.258,119.873 513.258,138.975C513.258,154.397 503.34,167.733 488.563,172.155L494.981,193.616C503.207,191.159 510.481,186.987 516.551,181.616C538.09,184.976 553.957,203.245 553.957,225.374C553.957,233.288 551.789,240.851 547.851,247.604C536.769,239.35 523.089,234.409 508.249,234.409C500.538,234.409 493.011,235.757 485.905,238.3C476.347,221.843 458.561,210.722 438.194,210.722C424.596,210.722 411.526,215.718 401.389,224.784L416.319,241.483C422.347,236.088 430.124,233.124 438.194,233.124C456.276,233.124 470.983,247.835 470.983,265.917L470.972,266.616L493.37,267.018L493.381,265.917C493.381,263.784 493.241,261.69 493.002,259.616C497.846,257.823 502.963,256.803 508.252,256.803C532.588,256.803 552.373,276.6 552.373,300.932C552.366,325.268 532.58,345.065 508.244,345.065L508.245,345.06Z'
          style={{ fillRule: 'nonzero' }}
        />
      </g>
    </g>
  </svg>
);

export default SmallBrainIcon;
