import React, { Fragment } from 'react';
import { VictoryPie, VictoryAnimation, VictoryLabel } from 'victory-native';
import { Svg, G } from 'react-native-svg';
import { StyleSheet } from 'react-native';
export default function ProgressCircle({ data, title }) {

    const colorValid = ((value) => {
        if (value <= 90) return "#DC2626";
        if (value <= 98) return "#F18800";
        if (value > 98) return "#10B981";
    });

    return (
        <Svg viewBox="0 0 400 400" width="100%" height="100%">

                <VictoryPie
                    standalone={false}
                    animate={{ duration: 1000 }}
                    width={70}
                    height={70}
                    data={[{ x: 1, y: 100 }]}
                    innerRadius={70}
                    cornerRadius={0}
                    labels={() => null}
                    style={{
                        data: {
                            fill: "#000"
                        }
                    }}
                />
                <VictoryPie
                    standalone={false}
                    animate={{ duration: 1000 }}
                    width={70}
                    height={70}
                    data={data}
                    innerRadius={10}
                    cornerRadius={5}
                    labels={() => null}
                    style={{
                        data: {
                            fill: d => {
                                return d.datum.x === 1 ? colorValid(data) : "transparent";
                            }
                        }
                    }}
                />

                <VictoryAnimation duration={1000} data={data}>
                    {newProps => {
                        return (
                            <Fragment>
                                <VictoryLabel
                                    textAnchor="middle"
                                    verticalAnchor="middle"
                                    x={200}
                                    y={200}
                                    text={`${Math.round(newProps)}%`}
                                    style={{ fontSize: 45 }}
                                />
                                <VictoryLabel
                                    textAnchor="middle"
                                    verticalAnchor="middle"
                                    x={200}
                                    y={200}
                                    text={title}
                                    style={{ fontSize: 30 }}
                                />
                            </Fragment>
                        );
                    }}
                </VictoryAnimation>

        </Svg>
    );
}