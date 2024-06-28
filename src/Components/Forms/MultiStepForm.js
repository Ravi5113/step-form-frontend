import React, { useState } from 'react';
import { Form, Input, Button, Steps, Layout, Typography } from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Style.css";

const { Step } = Steps;
const { Content } = Layout;
const { Title, Text } = Typography;

const MultiStepForm = () => {
    const [current, setCurrent] = useState(0);

    const onNext = () => {
        setCurrent(current + 1);
    };

    const onPrev = () => {
        setCurrent(current - 1);
    };

    const steps = [
        {
            content: (
                <Content className='text-start'>
                    <Title className='custom-h1 text-start m-0' level={2}>Contact details</Title>
                    <Text className='custom-p text-start' type="secondary">
                        Lorem ipsum dolor sit amet consectetur adipisc.
                    </Text>
                    <Form layout="vertical" className='text-start mt-4 sty'>
                        <Form.Item label="Name" name="name" className='h3 fw-semibold'>
                            <Input
                                placeholder="John Carter"
                                className='mb-3 px-3 py-2 border rounded-pill shadow bg-white fs-5 fw-bolder sty'
                                suffix={<UserOutlined />}
                            />
                        </Form.Item>
                        <Form.Item label="Email" name="email" className='h3 fw-semibold'>
                            <Input
                                placeholder="Email address"
                                className='mb-3 px-3 py-2 border rounded-pill shadow bg-white fs-5 fw-bolder sty'
                                suffix={<MailOutlined />} />
                        </Form.Item>
                    </Form>
                </Content>

            ),
        },
        {
            content: <div>Step 2 Content</div>,
        },
        {
            content: <div>Step 3 Content</div>,
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
            <Content className="p-5 bg-white rounded-3 shadow-lg" style={{ maxWidth: '600px', width: '100%' }}>
                <Steps current={current} className="custom-steps">
                    {steps.map((item, index) => (
                        <Step key={index} />
                    ))}
                </Steps>
                <div className='w-100 text-danger border-bottom'></div>
                <div className="mt-5 w-100 ">{steps[current].content}</div>

            </Content>
            <div className="d-flex justify-content-between mt-5 mb-3">
                {current > 0 && (
                    <Button onClick={onPrev} shape="round" className='custom-button'>
                        Previous
                    </Button>
                )}
                {current < steps.length - 1 && (
                    <Button type="primary" shape="round" onClick={onNext}>
                        Next step
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" shape="round">
                        Done
                    </Button>
                )}
            </div>
        </Layout>
    );
};

export default MultiStepForm;
