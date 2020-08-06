import React, { useState,  FormEvent } from 'react'
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';
import TextArea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';

export default function TeacherForm(){

    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState(''); 
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItems, setScheduleItems] = useState([ 
        {week_day: 0, from: '', to: ''},
    ]);


    function addNewScheduleItem(){
       setScheduleItems([
           ...scheduleItems,
           {week_day: 0, from: '', to: ''},
       ]);
    }

    function setScheduleItemsValue(position: number, field: string, value: string){
        const updateScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if(index === position){
                return{ ...scheduleItem, [field]: value };

            }
            return scheduleItem;
        })
        setScheduleItems(updateScheduleItems);
    }

    function handleCreateClass(e: FormEvent){
        e.preventDefault();

        api.post('classes',{
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() =>{
            alert('cadastro realizado com sucesso')
            history.push('/');
        }).catch(() => {
            alert('erro no cadastro')
        })

        console.log({
            name,
            bio,
            avatar,
            whatsapp,
            cost,
            subject,
            scheduleItems
        });
    }

    return(
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrível que você quer dar aulas."
                description="O primeiro passo é preencher esse formulário de inscrição"
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input
                            type="text"
                            label="Nome completo"
                            name="name" 
                            value={ name }
                            onChange={ e => setName(e.target.value) } 
                        />

                        <Input 
                            type="text" 
                            label="Avatar" 
                            name="avatar" 
                            value={ avatar }
                            onChange={ e => setAvatar(e.target.value) }
                        />

                        <Input 
                            type="text" 
                            label="WhatsApp" 
                            name="whatsapp" 
                            value={ whatsapp }
                            onChange={ e => setWhatsapp(e.target.value) }
                        />

                        <TextArea 
                            name="bio" 
                            label="Biografia"
                            value={ bio }
                            onChange={ e => setBio(e.target.value) }
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Select 
                            value={ subject }
                            onChange={ e => setSubject(e.target.value) }
                            label="Matéria"
                            name="subject" 
                            options={[ 
                                { value: 'Artes', label: 'Artes'},
                                { value: 'Biologia', label: 'Biologia'},
                                { value: 'Educação física', label: 'Educação fisica'},
                                { value: 'Ciências', label: 'Ciências'},
                                { value: 'Física', label: 'Física'},
                                { value: 'História', label: 'História'},
                                { value: 'Geografia', label: 'Geografia'},
                                { value: 'Matemática', label: 'Matemática'},
                                { value: 'Português', label: 'Português'},
                                { value: 'Química', label: 'Química'},
                            ]}
                        />

                        <Input 
                            type="text" 
                            label="Custo da sua hora por aula" 
                            name="cost"
                            value={ cost }
                            onChange={ e => setCost(e.target.value) }
                        />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis

                            <button type="button" onClick={ addNewScheduleItem }>
                                + Novo horário
                            </button>
                        </legend>

                        { scheduleItems.map((scheduleItem, index) => {
                            return(
                                <div key={ scheduleItem.week_day } className="schedule-item">
                                    <Select 
                                        label="Dia da semana" 
                                        name="week_day" 
                                        value={ scheduleItem.week_day }
                                        onChange={ e => setScheduleItemsValue(index, 'week_day', e.target.value) }
                                        options={[ 
                                            { value: '0', label: 'Domingo'},
                                            { value: '1', label: 'Segunda-feira'},
                                            { value: '2', label: 'Terça-feira'},
                                            { value: '3', label: 'Quarta-feira'},
                                            { value: '4', label: 'Quinta-feira'},
                                            { value: '5', label: 'Sexta-feira'},
                                            { value: '6', label: 'Sábado'},
                                        ]}
                                    />

                                    <Input 
                                        type="time" 
                                        name="from" 
                                        label="Das" 
                                        value={ scheduleItem.from }
                                        onChange={ e => setScheduleItemsValue(index, 'from', e.target.value) }
                                    />

                                    <Input 
                                        type="time" 
                                        name="to" 
                                        label="Até" 
                                        value={ scheduleItem.to }
                                        onChange={ e => setScheduleItemsValue(index, 'to', e.target.value) }
                                    />
                                </div>
                            );
                        }) }
                        
                    </fieldset>

                    <footer>
                        <p>
                            <img src={ warningIcon } alt="Aviso importante"/>
                            Importante<br/>
                            Preencha todos os dados
                        </p>
                        <button type="submit">
                            Salvar cadasto
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}