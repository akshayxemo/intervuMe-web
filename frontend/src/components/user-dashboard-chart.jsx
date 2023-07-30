import PropTypes from "prop-types";
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { format, parseISO } from "date-fns";
CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
  label: PropTypes.string,
};
UserDashboardChart.propTypes = {
  data: PropTypes.array.isRequired,
};

function CustomTooltip({ active, payload, label }) {
  if (active) {
    return (
      <div className="toolTip">
        <h4 className="tool-tip-header">
          {format(parseISO(label), "eee, d MMM yyyy")}
        </h4>
        {/* ..........................................data 1 */}
        <div className="tool-tip-info-wrap">
          <div className="tool-tip-data">
            <div className="tool-tip-data-header">
              <div
                className="indiactor"
                style={{
                  backgroundColor: `${payload[0].stroke}`,
                }}
              ></div>
              <p className="tool-tip-title">Technical Skill</p>
            </div>
            <p className="tool-tip-info">{payload[0].value}</p>
          </div>
          {/* ..........................................data 2 */}
          <div className="tool-tip-data">
            <div className="tool-tip-data-header">
              <div
                className="indiactor"
                style={{
                  backgroundColor: `${payload[1].stroke}`,
                }}
              ></div>
              <p className="tool-tip-title">Problem Solving</p>
            </div>
            <p className="tool-tip-info">{payload[1].value}</p>
          </div>
          {/* ..........................................data 3 */}
          <div className="tool-tip-data">
            <div className="tool-tip-data-header">
              <div
                className="indiactor"
                style={{
                  backgroundColor: `${payload[2].stroke}`,
                }}
              ></div>
              <p className="tool-tip-title">communication</p>
            </div>
            <p className="tool-tip-info">{payload[2].value}</p>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

function UserDashboardChart(props) {
  console.log("component");
  console.log(props.data);
  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={props.data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorTS" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3685CC" stopOpacity={0.1} />
              <stop offset="75%" stopColor="#3685CC" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPS" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#34A853" stopOpacity={0.1} />
              <stop offset="75%" stopColor="#34A853" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorCS" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EA4335" stopOpacity={0.1} />
              <stop offset="75%" stopColor="#EA4335" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            className="x-axis"
            dataKey="date"
            axisLine={false}
            tickLine={false}
            dy={10}
            tickFormatter={(str) => {
              const date = parseISO(str);
              // if (date.getDate() % 7 === 0) {
              //   return format(date, "MMM, d");
              // }
              return format(date, "MMM, d");
            }}
          />
          <YAxis
            className="y-axis"
            width={30}
            axisLine={false}
            tickLine={false}
            tickCount={5}
            domain={[0, 5]}
            tickFormatter={(str) => {
              const data = Number(str);
              if (data !== 0) {
                return data;
              }
              return "";
            }}
            dx={-10}
          />
          <Tooltip content={<CustomTooltip />} />
          <CartesianGrid vertical={false} strokeDasharray="8 8" />
          <Area
            type="monotone"
            dataKey="technicalSkill"
            stroke="#3685CC"
            fillOpacity={1}
            fill="url(#colorTS)"
            activeDot={{ r: 6 }}
          />
          <Area
            type="monotone"
            dataKey="problemSolving"
            stroke="#34A853"
            fillOpacity={0.5}
            fill="url(#colorPS)"
            activeDot={{ r: 6 }}
          />
          <Area
            type="monotone"
            dataKey="communicationSkill"
            stroke="#EA4335"
            fillOpacity={0.2}
            fill="url(#colorCS)"
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
}

export default UserDashboardChart;
