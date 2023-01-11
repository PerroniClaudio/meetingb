import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
  Pressable,
  Modal,
} from "react-native";
import React from "react";

import {
  ArrowLeftIcon,
  ArrowDownTrayIcon,
  PlusIcon,
  XMarkIcon,
} from "react-native-heroicons/solid";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

import DateTimePickerModal from "react-native-modal-datetime-picker";

import { editEvent , reset } from '../features/events/eventSlice'
import { useDispatch, useSelector } from "react-redux";


const EditEventScreen = () => {
  const { params } = useRoute();
  const navigation = useNavigation();

  const [eventData, setEventData] = useState(params);
  const [eventDate, setEventDate] = useState(new Date());
  const [eventEndDate, setEventEndDate] = useState(new Date());
  const [eventStartDate, setEventStartDate] = useState(new Date());

  const [showStartDateTimePicker, setShowStartDateTimePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const [showAttendeeModal, setShowAttendeeModal] = useState(false);
  const [attendeesToAdd, setAttendeesToAdd] = useState([]);
  const [attendeesShowError, setAttendeesShowError] = useState(false);
  const [attendeeTextValue, setAttendeeTextValue] = useState("");

  const dispatch = useDispatch()
  const {isLoading} = useSelector(state => state.events)

  useEffect(() => {
    setEventDate(new Date(params.start_date));
    setEventEndDate(new Date(params.end_date));
    setEventStartDate(new Date(params.start_date));
  }, []);

  const handleOnChange = (field, value) => {
    setEventData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleConfirmStartDate = (date) => {
    setEventDate(date);
    setShowStartDateTimePicker(false);
  };

  const handleConfirmStartTime = (date) => {
    setEventStartDate(date);
    setShowStartTimePicker(false);
  };

  const handleConfirmEndTime = (date) => {
    setEventEndDate(date);
    setShowEndTimePicker(false);
  };

  const handleChangeDate = (e) => {
    switch (e.target.id) {
      case "start-time-input":
        setEventStartDate((prevState) => {
          let ymd = getYMD(prevState);
          return new Date(`${ymd} ${e.target.value}`);
        });

        break;
      case "end-time-input":
        setEventEndDate((prevState) => {
          let ymd = getYMD(prevState);

          return new Date(`${ymd} ${e.target.value}`);
        });

        break;
      case "date-input":
        let date = new Date(e.target.value);
        setEventDate(date);
        break;
    }
  };

  const renderDatePicker = () => {
    if (Platform.OS !== "web") {
      return (
        <>
          <View className="px-4 mb-2">
            <Text className="text-xl font-bold mb-2">Data</Text>
            <Pressable
              onPress={() => setShowStartDateTimePicker(true)}
              className="p-4 rounded border border-gray-200"
            >
              <Text>
                {eventDate.toLocaleDateString("it-IT", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </Pressable>
          </View>

          <View className="px-4 mb-4">
            <View className="flex flex-row">
              <View className="basis-1/2 pr-2">
                <Text className="text-lg font-bold mb-2">Inzio</Text>

                <Pressable
                  className="p-4 rounded border border-gray-200 w-full"
                  onPress={() => setShowStartTimePicker(true)}
                >
                  <Text>
                    {
                      eventStartDate
                        .toLocaleDateString("it-IT", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                        .split(" ")[1]
                    }
                  </Text>
                </Pressable>
              </View>

              <View className="basis-1/2 pl-2">
                <Text className="text-lg font-bold mb-2">Fine</Text>
                <Pressable
                  className="p-4 rounded border border-gray-200 w-full"
                  onPress={() => setShowEndTimePicker(true)}
                >
                  <Text>
                    {
                      eventEndDate
                        .toLocaleDateString("it-IT", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                        .split(" ")[1]
                    }
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>

          <DateTimePickerModal
            isVisible={showStartDateTimePicker}
            locale="it-IT"
            mode="date"
            date={eventDate}
            onConfirm={handleConfirmStartDate}
            onCancel={() => setShowStartDateTimePicker(false)}
            display="inline"
            confirmTextIOS="Conferma"
            cancelTextIOS="Annulla"
            minimumDate={new Date()}
          />

          <DateTimePickerModal
            isVisible={showStartTimePicker}
            locale="it-IT"
            mode="time"
            date={eventStartDate}
            onConfirm={handleConfirmStartDate}
            onCancel={() => setShowStartTimePicker(false)}
            confirmTextIOS="Conferma"
            cancelTextIOS="Annulla"
          />

          <DateTimePickerModal
            isVisible={showEndTimePicker}
            locale="it-IT"
            mode="time"
            date={eventEndDate}
            onConfirm={handleConfirmEndTime}
            onCancel={() => setShowEndTimePicker(false)}
            confirmTextIOS="Conferma"
            cancelTextIOS="Annulla"
          />
        </>
      );
    } else {
      return (
        <>
          <View className="px-4 mb-2">
            <Text className="text-xl font-bold mb-2">Data</Text>
            <input
              type="date"
              name=""
              id="date-input"
              className={"p-4 rounded border border-gray-200 w-full"}
              value={eventDate.toISOString().split("T")[0]}
              min={new Date().toISOString().split("T")[0]}
              onChange={handleChangeDate}
            />
          </View>

          <View className="px-4 mb-4">
            <View className="flex flex-row">
              <View className="basis-1/2 pr-2">
                <Text className="text-lg font-bold mb-2">Inzio</Text>
                <input
                  type="time"
                  name=""
                  id="start-time-input"
                  className={"p-4 rounded border border-gray-200 w-full"}
                  value={
                    eventStartDate
                      .toLocaleDateString("it-IT", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                      .split(" ")[1]
                  }
                  onChange={handleChangeDate}
                />
              </View>

              <View className="basis-1/2 pr-2">
                <Text className="text-lg font-bold mb-2">Fine</Text>
                <input
                  type="time"
                  name=""
                  id="end-time-input"
                  className={"p-4 rounded border border-gray-200 w-full"}
                  value={
                    eventEndDate
                      .toLocaleDateString("it-IT", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                      .split(" ")[1]
                  }
                  onChange={handleChangeDate}
                />
              </View>
            </View>
          </View>
        </>
      );
    }
  };

  const checkAttendeeValue = () => {
    if (validateEmail(attendeeTextValue)) {
      setAttendeesShowError(false);
      setAttendeesToAdd((prevState) => [
        ...prevState,
        {
          id: Math.round(Math.random() * 10000),
          email: attendeeTextValue,
        },
      ]);

      setAttendeeTextValue("");
    } else {
      setAttendeeTextValue("");
      setAttendeesShowError(true);
    }
  };

  const confirmNewAttendees = () => {
    let oldAttendees = eventData.attendees;
    let newAttendees = attendeesToAdd.map((element) => element.email);

    setEventData((prevState) => ({
      ...prevState,
      attendees: [...oldAttendees, ...newAttendees],
    }));

    setShowAttendeeModal(false);
    setAttendeesToAdd([]);
  };

  const handlePressEdit = () => {
    
    dispatch(editEvent(eventData))
  }

  return (
    <View className="h-full">

      <View className="bg-white flex-row items-center justify-between pt-8 pb-4 px-4">
        <TouchableOpacity
          className="bg-gray-100 justify-center items-center p-3 rounded-full"
          onPress={navigation.goBack}
        >
          <ArrowLeftIcon color="#00e676" size={20} />
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-gray-100 justify-center items-center p-3 rounded-full "
          onPress={() => handlePressEdit()}
        >
          <ArrowDownTrayIcon color="#00e676" size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView className="bg-white">
        <View className="px-4 mb-2">
          <Text className="text-xl font-bold mb-2">Oggetto</Text>
          <TextInput
            className="p-4 rounded border border-gray-200"
            name={"subject"}
            value={eventData.subject}
            onChangeText={(newText) => handleOnChange("subject", newText)}
          />
        </View>

        <View className="px-4 mb-2">
          <Text className="text-xl font-bold mb-2">Descrizione</Text>
          <TextInput
            className="p-4 rounded border border-gray-200 h-20"
            name={"description"}
            numberOfLines={4}
            multiline={true}
            value={eventData.description}
            onChangeText={(newText) => handleOnChange("description", newText)}
          />
        </View>

        {renderDatePicker()}

        <View className="px-4 mb-2">
          <Text className="text-xl font-bold mb-2">Stanza</Text>
          <Pressable className="p-4 rounded border border-gray-200 w-full">
            <Text>{eventData.room.name} - {eventData.room.building.name}</Text>
          </Pressable>
        </View>

        <View className="px-4 mb-2">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-2xl font-bold mb-2">Invitati</Text>

            <TouchableOpacity
              className="bg-gray-100 justify-center items-center p-3 rounded-full "
              onPress={() => setShowAttendeeModal(true)}
            >
              <PlusIcon color="#00e676" size={20} />
            </TouchableOpacity>
          </View>

          {eventData.attendees.map((attendee) => (
            //Puoi modificarli solo se non hanno già confermato

            <View
              key={Math.random()}
              className="flex-row justify-between items-center space-x-2 bg-gray-200 w-full rounded-full p-2 pl-4 shadow mb-2"
            >
              <Text className="font-bold">{attendee}</Text>

              <TouchableOpacity>
                <XMarkIcon />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      <Modal
        visible={showAttendeeModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowAttendeeModal(false)}
      >
        <View className="flex-1 justify-center items-center bg-[#00000053] ">
          <View className="bg-white p-4 rounded w-10/12 lg:w-1/2">
            <Text className="text-xl font-bold">Nuovo invitato</Text>

            <View className="flex-row space-x-2 mb-2">
              <TextInput
                className={
                  attendeesShowError
                    ? "flex-1 p-4 rounded border border-red-400 outline-0"
                    : "flex-1 p-4 rounded border border-gray-200 outline-0"
                }
                value={attendeeTextValue}
                onChangeText={(text) => setAttendeeTextValue(text)}
                onTouchEnd={() => setAttendeesShowError(false)}
                onClick={() => setAttendeesShowError(false)}
              />

              <TouchableOpacity
                className="justify-center items-center p-3"
                onPress={checkAttendeeValue}
              >
                <PlusIcon color="#00e676" size={20} />
              </TouchableOpacity>
            </View>

            <ScrollView>
              {attendeesToAdd.map((attendee, index) => (
                <View
                  key={attendee.id}
                  className="flex-row justify-between items-center space-x-2 bg-gray-200 w-full rounded-full p-2 pl-4 shadow mb-2"
                >
                  <Text className="font-bold">{attendee.email}</Text>

                  <TouchableOpacity
                    onPress={() =>
                      setAttendeesToAdd((prevState) =>
                        prevState.filter((element) => element.id != attendee.id)
                      )
                    }
                  >
                    <XMarkIcon />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity
              className="bg-[#00e676] p-3 rounded-full"
              onPress={confirmNewAttendees}
            >
              <Text className="font-bold text-white text-center">Conferma</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
    </View>
  );
};

const getCurrentTimestamp = (date) => {
  const leadingzero = (n) => {
    if (n < 10) {
      return `0${n}`;
    } else {
      return `${n}`;
    }
  };

  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  let timestamp = `${year}-${leadingzero(month)}-${leadingzero(
    day
  )} ${leadingzero(hours)}:${leadingzero(minutes)}:${leadingzero(seconds)}`;

  return timestamp;
};

const getHMS = (date) => {
  const leadingzero = (n) => {
    if (n < 10) {
      return `0${n}`;
    } else {
      return `${n}`;
    }
  };

  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  let timestamp = `${leadingzero(hours)}:${leadingzero(minutes)}:${leadingzero(
    seconds
  )}`;

  return timestamp;
};

const getYMD = (date) => {
  const leadingzero = (n) => {
    if (n < 10) {
      return `0${n}`;
    } else {
      return `${n}`;
    }
  };

  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  let timestamp = `${year}-${leadingzero(month)}-${leadingzero(day)}`;

  return timestamp;
};

function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default EditEventScreen;
