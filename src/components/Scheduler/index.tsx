import { supabase } from '@/lib/supabase';
import { TextInput } from '@mantine/core';
import { Agenda, Day, DragAndDrop, FieldModel, Inject, Month, Resize, ScheduleComponent, ViewDirective, ViewsDirective, Week, WorkWeek } from '@syncfusion/ej2-react-schedule';
import { useEffect, useRef, useState } from 'react';
import { type Tables } from "../../lib/database.types";
import './styles.min.css';


export default function Scheduler() {
    const [events, setEvents] = useState<Tables<'events'>[] | null>(null);


    const scheduleObj = useRef(null);

    const [scheduleData, setScheduleData] = useState(new Date());

    const change = (args) => {
        setScheduleData(args.value);
        scheduleObj.current.dataBind();
    };

    const onDragStart = (args) => {
        args.navigation.enable = true;
    };


    async function getEvents() {
        const { data, error } = await supabase.from('events').select();
        console.log(data)
        setEvents(data);
    }

    useEffect(() => {
        getEvents()
    }, [])


    const fields: FieldModel = {
        id: 'id',
        subject: { name: 'title' },
        location: { name: 'location' },
        description: { name: 'description' },
        startTime: { name: 'start' },
        endTime: { name: 'end' },

    }



    const editorTemplate = (props: Record<string, any>) => {
        console.log(props)
        return <TextInput name="name" id="name" placeholder='Name' value={props.name} />
    }

    scheduleObj.current

    return (
        <ScheduleComponent actionComplete={console.log} ref={scheduleObj} selectedDate={scheduleData} eventSettings={{ dataSource: events, fields: fields }} dragStart={(onDragStart)}>
            <ViewsDirective>
                <ViewDirective option='Day' />
                <ViewDirective option='Week' />
                <ViewDirective option='WorkWeek' />
                <ViewDirective option='Month' />
                <ViewDirective option='Agenda' />
            </ViewsDirective>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
        </ScheduleComponent>
    )
}