import React, {useState} from "react";
import Row from '../../DSL/Row/Row';
import Col from '../../DSL/Col/Col';
import Pane from '../../DSL/Pane/Pane';
import observeMobx from '../../observeMobx';
import {useAppStore} from '../../store/App.store';
import Colors from '../../DSL/Colors';
import {css} from '../../helpers/css';
import PaneWithTitle from '../../DSL/Pane/PaneWithTitle';
import Button from '../../DSL/Button/Button';
import Input from '../../DSL/Input/Input';
import Typography, {TType} from '../../DSL/Typography/Typography';
import Modal from '../../DSL/Modal/Modal';

const DSLPage = observeMobx((props: any) => {
    const app = useAppStore();
    const [value, setValue] = useState('');
    const [modal, setModal] = useState(false);
    return (
        <>
            <Row sm={12} className={css('mt-2')}>
                <Col sm={6}>
                    <PaneWithTitle title='Typography'>
                        <Typography type={TType.BodyRegular} size={20}>
                            Some More Typography
                        </Typography>
                        <Typography type={TType.BodyRegular} className={css(Colors.color.success)} size={20}>
                            Hey look some color!
                        </Typography>
                    </PaneWithTitle>
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <PaneWithTitle title='Buttons'>
                        <div className={css('d-flex', 'justify-content-between')}>
                            <Button block size='sm' className={css('mt-2', 'mr-2')}>
                                Small
                            </Button>
                            <Button block size='md' secondary className={css('mt-2', 'ml-2')}>
                                Medium + Secondary
                            </Button>
                        </div>
                        <Button size='lg' className={css('mt-2')}>
                            large
                        </Button>
                    </PaneWithTitle>
                </Col>
                <Col sm={6}>
                    <PaneWithTitle title='Inputs'>
                        <Input
                            value={value}
                            onChange={setValue}
                            placeholder='Small'
                        />
                        <Input
                            value={value}
                            onChange={setValue}
                            placeholder='Medium'
                            size='md'
                            className="mt-2"
                        />
                        <Input
                            value={value}
                            onChange={setValue}
                            placeholder='Large'
                            size='lg'
                            className="mt-2"
                        />
                    </PaneWithTitle>
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <PaneWithTitle title='Modal'>
                        <Button size='lg' className={css('mt-2')} onClick={() => setModal(true)}>
                            Open Modal
                        </Button>
                    </PaneWithTitle>
                </Col>
            </Row>
            <Modal visible={modal} setVisible={setModal} title='This is a modal' footer={() => <div className={css('d-flex')}>
                <Button secondary size='md'>Button 1</Button>
                <Button className={css('ml-2')} size='md'>Button 2</Button>
            </div>}>
                <Typography type={TType.BodyRegular} size={15}>
                    And here is some modal content ...
                </Typography>
            </Modal>
        </>
    );
})

export default DSLPage;