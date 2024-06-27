// src/MultiStepForm.js
import React, { useState } from 'react';
import { Steps, Form, Input, Button } from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';

const { Step } = Steps;

const MultiStepForm = () => {
    const [current, setCurrent] = useState(0);

    const next = () => setCurrent(current + 1);
    const prev = () => setCurrent(current - 1);

    const steps = [
        {
            title: 'Contact Details',
            content: (
                <Form layout="vertical">
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: 'Please enter your name' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="John Carter" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: 'Please enter your email' }]}
                    >
                        <Input prefix={<MailOutlined />} placeholder="Email address" />
                    </Form.Item>
                </Form>
            ),
        },
        // Add more steps here
    ];

    return (
        <div className="form-container">
            <h2>Get a project quote</h2>
            <p>Please fill the form below to receive a quote for your project. Feel free to add as much detail as needed.</p>
            <Steps current={current}>
                {steps.map((item) => (
                    <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            <div className="steps-content">{steps[current].content}</div>
            <div className="steps-action">
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Next step
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                        Previous
                    </Button>
                )}
            </div>
        </div>
    );
};

export default MultiStepForm;
