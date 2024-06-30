import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Steps, Layout, Typography, Row, Col, Card, Radio, Table, Modal } from 'antd';
import { UserOutlined, MailOutlined, CodeOutlined, LayoutOutlined, BulbOutlined, SettingOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Style.css";

const { Step } = Steps;
const { Content } = Layout;
const { Title, Text } = Typography;

const services = [
    {
        title: 'Development',
        icon: <CodeOutlined style={{ fontSize: '30px' }} />
    },
    {
        title: 'Web Design',
        icon: <LayoutOutlined style={{ fontSize: '30px' }} />
    },
    {
        title: 'Marketing',
        icon: <BulbOutlined style={{ fontSize: '30px' }} />
    },
    {
        title: 'Other',
        icon: <SettingOutlined style={{ fontSize: '30px' }} />
    },
];

const MultiStepForm = () => {
    const [current, setCurrent] = useState(0);
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        service: '',
        budget: '',
    });
    const [submittedData, setSubmittedData] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/getFormData');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    const onNext = () => {
        if (current === 2) {
            if (!formData.budget) {
                Modal.error({
                    title: 'Validation Error',
                    content: 'Please select a budget range before proceeding.',
                });
                return;
            }
            handleSubmit();
        } else {
            form.validateFields().then(() => {
                setCurrent(current + 1);
            }).catch(errorInfo => {
                console.log('Validation Failed:', errorInfo);
            });
        }
    };

    const onPrev = () => {
        setCurrent(current - 1);
    };

    const handleCardClick = (index) => {
        setSelectedCard(index);
        setFormData({ ...formData, service: services[index].title });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleBudgetChange = (e) => {
        setFormData({ ...formData, budget: e.target.value });
    };

    const handleSubmit = () => {
        form.validateFields().then(() => {
            console.log('Form data to be submitted:', formData);

            fetch('http://localhost:5000/saveFormData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then(response => {
                    console.log('Response received from backend:', response);
                    if (response.ok) {
                        Modal.success({
                            content: 'Form data submitted and saved successfully!',
                        });

                        // Fetch the updated data after submission
                        fetch('http://localhost:5000/getFormData')
                            .then(response => response.json())
                            .then(data => {
                                console.log('Updated submitted data:', data);
                                setSubmittedData(data);
                                setCurrent(current + 1); // Move to the next step after submission
                            })
                            .catch(error => console.error('Error fetching data:', error));
                    } else {
                        alert('Error saving form data');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }).catch(errorInfo => {
            console.log('Validation Failed:', errorInfo);
        });
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Service',
            dataIndex: 'service',
            key: 'service',
        },
        {
            title: 'Budget',
            dataIndex: 'budget',
            key: 'budget',
        },
    ];

    const steps = [
        {
            content: (
                <Content className='text-start'>
                    <Title className='custom-h1 text-start m-0' level={2}>Contact details</Title>
                    <Text className='custom-p text-start' type="secondary">
                        Lorem ipsum dolor sit amet consectetur adipisc.
                    </Text>
                    <Form
                        form={form}
                        layout="vertical"
                        className='text-start mt-4 sty'
                        initialValues={formData}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            className='h3 fw-semibold'
                            rules={[{ required: true, message: 'Please enter your name' }]}
                        >
                            <Input
                                placeholder="John Carter"
                                className='mb-3 px-3 py-2 border rounded-pill bg-white fs-5 fw-bolder sty'
                                suffix={<UserOutlined />}
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            className='h3 fw-semibold'
                            rules={[
                                { required: true, message: 'Please enter your email' },
                                { type: 'email', message: 'Please enter a valid email' },
                            ]}
                        >
                            <Input
                                placeholder="Email address"
                                className='mb-3 px-3 py-2 border rounded-pill bg-white fs-5 fw-bolder sty'
                                suffix={<MailOutlined />}
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </Form.Item>
                    </Form>
                </Content>
            ),
        },
        {
            content: (
                <Content className='text-start'>
                    <Title className='custom-h1 text-start m-0' level={2}>Our services</Title>
                    <Text className='custom-p text-start' type="secondary">
                        Please select which service you are interested in.
                    </Text>
                    <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
                        {services.map((service, index) => (
                            <Col key={index} xs={24} sm={12} md={12} lg={12}>
                                <Card
                                    hoverable
                                    className={`custom-card ${selectedCard === index ? 'selected' : ''}`}
                                    onClick={() => handleCardClick(index)}
                                >
                                    <div className='card-content'>
                                        <div className='Service-icon'> {service.icon}</div>
                                        <Title level={4} className='Text-Title'>{service.title}</Title>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Content>
            ),
        },
        {
            content: (
                <Content className='text-start'>
                    <Title className='custom-h1 text-start m-0' level={2}>Budget</Title>
                    <Text className='custom-p text-start' type="secondary">
                        Please select your budget range.
                    </Text>
                    <Radio.Group
                        className="budget-radio-group"
                        onChange={handleBudgetChange}
                        value={formData.budget}
                    >
                        <Radio.Button
                            value="$5,000 - $10,000"
                            className="budget-radio-button"
                            style={{
                                border: `2px solid ${formData.budget === "$5,000 - $10,000" ? "#4a3aff" : "transparent"}`,
                                color: formData.budget === "$5,000 - $10,000" ? "#4a3aff" : undefined,
                                borderRadius: "5px",
                                padding: "5px 10px",
                            }}
                        >
                            $5,000 - $10,000
                        </Radio.Button>
                        <Radio.Button
                            value="$10,000 - $20,000"
                            className="budget-radio-button"
                            style={{
                                border: `2px solid ${formData.budget === "$10,000 - $20,000" ? "#4a3aff" : "transparent"}`,
                                color: formData.budget === "$10,000 - $20,000" ? "#4a3aff" : undefined,
                                borderRadius: "5px",
                                padding: "5px 10px",
                            }}
                        >
                            $10,000 - $20,000
                        </Radio.Button>
                        <Radio.Button
                            value="$20,000 - $50,000"
                            className="budget-radio-button"
                            style={{
                                border: `2px solid ${formData.budget === "$20,000 - $50,000" ? "#4a3aff" : "transparent"}`,
                                color: formData.budget === "$20,000 - $50,000" ? "#4a3aff" : undefined,
                                borderRadius: "5px",
                                padding: "5px 10px",
                            }}
                        >
                            $20,000 - $50,000
                        </Radio.Button>
                        <Radio.Button
                            value="$50,000+"
                            className="budget-radio-button"
                            style={{
                                border: `2px solid ${formData.budget === "$50,000+" ? "#4a3aff" : "transparent"}`,
                                color: formData.budget === "$50,000+" ? "#4a3aff" : undefined,
                                borderRadius: "5px",
                                padding: "5px 10px",
                            }}
                        >
                            $50,000+
                        </Radio.Button>
                    </Radio.Group>
                </Content>
            ),
        },
        {
            content: (
                <Content className='text-start'>
                    <Title className='custom-h1 text-center m-0' level={2}>Form Data</Title>
                    <Text className='custom-p text-center' type="secondary">
                        This screen display submitted form data
                    </Text>
                    <Table
                        className='mt-4 custom-table'
                        columns={columns}
                        dataSource={submittedData.slice().reverse().map((item, index) => ({ ...item, key: index }))}
                        pagination={false}
                    />
                </Content>
            ),
        },
    ];

    return (
        <Layout className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
            <div className="text-center my-4" style={{ maxWidth: '600px' }}>
                <Title className='custom-h1' level={2}>Get a project quote</Title>
                <Text className='custom-p' type="secondary">
                    Please fill the form below to receive a quote for your project. Feel free to add as much detail as needed.
                </Text>
            </div>
            <Content className="p-5 bg-white shadow-lg w-100 md:w-75" style={{ maxWidth: '600px', borderRadius: '30px' }}>
                <Steps current={current} className="custom-steps">
                    {steps.slice(0, 3).map((item, index) => (
                        <Step key={index} />
                    ))}
                </Steps>
                <div className='w-100 text-danger border-bottom'></div>
                <div className="mt-5 w-100 ">{steps[current].content}</div>
            </Content>
            <div className="d-flex mt-5 mb-3 w-100" style={{ maxWidth: '600px', justifyContent: 'space-between' }}>
                {current > 0 && current < steps.length - 1 && (
                    <Button onClick={onPrev} shape="round" className='p-4 txt'>
                        Previous step
                    </Button>
                )}
                {current < steps.length - 1 && (
                    <Button type="primary" shape="round" className='p-4 txt' onClick={onNext}>
                        Next step
                    </Button>
                )}
            </div>
        </Layout>
    );
};

export default MultiStepForm;
