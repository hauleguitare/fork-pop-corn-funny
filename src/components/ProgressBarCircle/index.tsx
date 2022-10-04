import * as React from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface IProgressBarCircleProps {
  value: number;
  className?: string;
}

const ProgressBarCircle: React.FunctionComponent<IProgressBarCircleProps> = (props) => {
  const { value, className } = props;
  const percentage = Math.round(value * 10);
  return (
    <div className={className}>
      <CircularProgressbarWithChildren
        maxValue={10}
        value={value}
        strokeWidth={6}
        background={true}
        backgroundPadding={4}
        styles={buildStyles({
          textSize: '4px',
          strokeLinecap: 'rounded',
          pathTransitionDuration: 0.5,
          backgroundColor: '#001b0a',
          textColor: 'white',
          trailColor: '#092f36',
          pathColor: '#008c03',
        })}
      >
        <p>{percentage}%</p>
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default ProgressBarCircle;
