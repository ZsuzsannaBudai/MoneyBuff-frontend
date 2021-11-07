import './StatisticsCSS.css';
import React, {Fragment, useEffect, useState} from "react";
import {Chart} from "react-google-charts";
import {useHistory} from "react-router-dom";
import background from "../main-page/mainPageBackground.jpg";
import {Container, Nav, Navbar} from "react-bootstrap";
import littleLogo from "../main-page/signin_icon.png";
import {APIService} from "../../APIService";

export const Statistics = () => {
    const history = useHistory();

    function handleRouteToHome() {
        history.push("/mainpage");
    }

    function handleRouteToStatistics() {
        history.push("/statistics");
    }

    function handleRouteToSaveMoney() {
        history.push("/savemoney");
    }

    function handleRouteToAccount() {
        history.push("/account");
    }

    function handleRouteToLogOut() {
        history.push("/logout");
    }

    interface monthlyIncomeChartResponse {
        sumOfIncome: number;
        badge: string;
    }

    interface monthlyAverageExpensesResponse {
        sumOfExpense: number;
        month: string;
    }

    interface monthlyExpenseChartResponse {
        sumOfExpense: number;
        badge: string;
    }

    const [monthlyIncomeChartData, setMonthlyIncomeChartData] = useState([] as monthlyIncomeChartResponse[]);

    const [monthlyAverageExpenses, setMonthlyAverageExpenses] = useState([] as monthlyAverageExpensesResponse[]);

    const [monthlyExpenseChartData, setMonthlyExpenseChartData] = useState([] as monthlyExpenseChartResponse[]);

    const [monthlyExpenseBadgeChartData, setMonthlyExpenseBadgeChartData] = useState([[], [], []] as any[][]);

    const expenseCategories = ['Bills', 'Food', 'Travelling', 'Clothes', 'Home', 'Drugstore', 'Charity', 'Fun', 'Other'];

    const currentMonth = new Date().getMonth() + 1;
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Augustus', 'September', 'October', 'November', 'December'];

    useEffect(() => {
        APIService.getStatisticsAboutMonthlyIncomeBadge(currentMonth).then(setMonthlyIncomeChartData)
        APIService.getStatisticsAboutMonthlyAverageExpenses(currentMonth).then((response) => {
            setMonthlyAverageExpenses(response);
            APIService.getStatisticsAboutMonthlyAverageExpenses(currentMonth - 1).then(previousMonth => {
                APIService.getStatisticsAboutMonthlyAverageExpenses(currentMonth - 2).then(twoMonthAgo => {
                    setMonthlyAverageExpenses([twoMonthAgo, previousMonth, response]);
                });
            })
        });
        APIService.getStatisticsAboutMonthlyExpenseBadge(currentMonth).then((response) => {
            setMonthlyExpenseChartData(response);
            APIService.getStatisticsAboutMonthlyExpenseBadge(currentMonth - 1).then(previousMonth => {
                APIService.getStatisticsAboutMonthlyExpenseBadge(currentMonth - 2).then(twoMonthsAgo => {
                    setMonthlyExpenseBadgeChartData([twoMonthsAgo, previousMonth, response]);
                });
            })
        });
    }, [])

    return (
        <Fragment>
            <div className="mainPageBackground" style={{backgroundImage: `url(${background})`}}>
                <div>
                    <Navbar fixed="top" bg="light">
                        <Container>
                            <img className="littleLogo" src={littleLogo} alt=""/>
                            <Navbar.Brand onClick={handleRouteToHome}>MoneyBuffer</Navbar.Brand>
                            <Nav className="me-auto">
                                <Nav.Link onClick={handleRouteToHome}>Home</Nav.Link>
                                <Nav.Link onClick={handleRouteToStatistics}>Statistics</Nav.Link>
                                <Nav.Link onClick={handleRouteToSaveMoney}>Save Money</Nav.Link>
                                <Nav.Link onClick={handleRouteToAccount}>Your Account</Nav.Link>
                                <div className="separatorLine"/>
                                <Nav.Link onClick={handleRouteToLogOut}>Log Out</Nav.Link>
                            </Nav>
                        </Container>
                    </Navbar>
                </div>
                <div className="statisticsCharts">
                    <div className="firstTwoChartsOnStatistics">
                        {!!monthlyIncomeChartData.length ? <Chart
                            chartType="ColumnChart"
                            data={[
                                ['Incomes', 'Income'],
                                ...monthlyIncomeChartData.map((dataByBadge) => [dataByBadge.badge, dataByBadge.sumOfIncome])
                            ]}
                            options={{
                                title: 'How much money you have from where?',
                                chartArea: {width: '60%'}, height: 400, width: 800,
                                hAxis: {
                                    title: 'Categories',
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'How much?',
                                },
                                fontSize: 15,
                            }}
                            legendToggle
                        /> : <span>No data available.</span>}
                        {!!monthlyAverageExpenses.length ? <Chart
                            chartType="ColumnChart"
                            data={[
                                ['Month', 'Expense'],
                                [months[currentMonth - 3], monthlyAverageExpenses[2]?.sumOfExpense],
                                [months[currentMonth - 2], monthlyAverageExpenses[1]?.sumOfExpense],
                                [months[currentMonth - 1], monthlyAverageExpenses[0]?.sumOfExpense]
                            ]}
                            options={{
                                title: 'How much money you spending in a month in average?',
                                chartArea: {width: '60%'}, height: 400, width: 800,
                                hAxis: {
                                    title: 'When?',
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'How much?',
                                    minValue: 0
                                },
                                fontSize: 15,
                            }}
                            legendToggle
                        /> : <span>No data available.</span>}
                    </div>
                    <div className="secondTwoChartsOnStatistics">
                        {!!monthlyIncomeChartData.length ? <Chart
                            chartType="ColumnChart"
                            data={[
                                ['Expenses', 'Expense'],
                                ...monthlyExpenseChartData.map((expenseByMonth) => [expenseByMonth.badge, expenseByMonth.sumOfExpense])
                            ]}
                            options={{
                                title: 'How much you spending on what?',
                                chartArea: {width: '60%'}, height: 400, width: 800,
                                hAxis: {
                                    title: 'Categories',
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'How much?',
                                },
                                fontSize: 15
                            }}
                            legendToggle
                        /> : <span>No data available.</span>}
                        <Chart
                            chartType="ColumnChart"
                            data={[
                                ['Month', ...expenseCategories],
                                [months[currentMonth - 3], ...expenseCategories.map(category => {
                                    const sumForCategory = monthlyExpenseBadgeChartData[0].find(dataByBadge => dataByBadge.badge === category)?.sumOfExpense;
                                    return sumForCategory ?? 0;
                                })],
                                [months[currentMonth - 2], ...expenseCategories.map(category => {
                                    const sumForCategory = monthlyExpenseBadgeChartData[1].find(dataByBadge => dataByBadge.badge === category)?.sumOfExpense;
                                    return sumForCategory ?? 0;
                                })],
                                [months[currentMonth - 1], ...expenseCategories.map(category => {
                                    const sumForCategory = monthlyExpenseBadgeChartData[2].find(dataByBadge => dataByBadge.badge === category)?.sumOfExpense;
                                    return sumForCategory ?? 0;
                                })]
                            ]}
                            options={{
                                title: 'How your expenses split monthly?',
                                chartArea: {width: '60%'}, height: 400, width: 800,
                                hAxis: {
                                    title: 'When?',
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'How much?',
                                },
                                fontSize: 15
                            }}
                            legendToggle
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    );
}