import { useEffect } from "react";
import {
  Container,
  Card,
  Button,
  Group,
  Stack,
  Text,
  ActionIcon,
  SimpleGrid,
  Center,
  Loader,
  Modal,
} from "@mantine/core";
import {
  IconEdit,
  IconTrash,
  IconPlus,
  IconCheckupList,
  IconHistory,
} from "@tabler/icons-react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchHabits, deleteHabit, upsertHabitLog } from "@/store/habitsSlice";
import { Habit } from "@/types";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { HabitLogsModal } from "./HabitLogsModal";

export const HabitsList = ({
  onEditHabit,
  onCreateHabit,
}: {
  onEditHabit?: (habit: Habit) => void;
  onCreateHabit?: () => void;
}) => {
  const dispatch = useAppDispatch();
  const { habits, loading } = useAppSelector((state) => state.habits);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [logsOpened, { open: openLogs, close: closeLogs }] =
    useDisclosure(false);

  useEffect(() => {
    dispatch(fetchHabits());
  }, [dispatch]);

  const handleDeleteHabit = (id: string) => {
    if (window.confirm("Вы уверены?")) {
      dispatch(deleteHabit(id));
    }
  };

  const handleShowLogs = (habit: Habit) => {
    setSelectedHabit(habit);
    openLogs();
  };

  if (loading && habits.length === 0) {
    return (
      <Center style={{ height: "400px" }}>
        <Loader />
      </Center>
    );
  }

  return (
    <Container size="xl" py="xl">
      <Group justify="space-between" mb="xl">
        <Group>
          <IconCheckupList size={32} />
          <Text size="xl" fw={700}>
            Мои привычки
          </Text>
        </Group>
        <Button leftSection={<IconPlus size={14} />} onClick={onCreateHabit}>
          Добавить привычку
        </Button>
      </Group>

      {habits.length === 0 ? (
        <Center py="xl">
          <Stack align="center" gap="sm">
            <IconCheckupList size={64} opacity={0.5} />
            <Text c="dimmed">Нет привычек</Text>
            <Button onClick={onCreateHabit}>Создать первую привычку</Button>
          </Stack>
        </Center>
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
          {habits.map((habit) => (
            <Card
              key={habit.id}
              withBorder
              radius="lg"
              p="lg"
              style={{
                transition: "box-shadow 0.2s ease, transform 0.2s ease",
                cursor: "pointer",
              }}
            >
              <Card.Section withBorder inheritPadding py="sm">
                <Stack gap={0}>
                  <Text fw={700} size="lg">
                    {habit.title}
                  </Text>
                  {habit.description && (
                    <Text size="sm" c="dimmed">
                      {habit.description}
                    </Text>
                  )}
                </Stack>
              </Card.Section>

              <Group grow pb="sm">
                <Button
                  variant="light"
                  onClick={() => {
                    setSelectedHabit(habit);
                    open();
                  }}
                  fullWidth
                >
                  Записать
                </Button>
                <Button
                  variant="light"
                  onClick={() => handleShowLogs(habit)}
                  leftSection={<IconHistory size={14} />}
                  fullWidth
                >
                  Логи
                </Button>
              </Group>

              <Card.Section withBorder inheritPadding py="sm">
                <Group justify="flex-end">
                  <ActionIcon
                    variant="light"
                    color="blue"
                    onClick={() => onEditHabit?.(habit)}
                  >
                    <IconEdit size={14} />
                  </ActionIcon>
                  <ActionIcon
                    variant="light"
                    color="red"
                    onClick={() => handleDeleteHabit(habit.id)}
                  >
                    <IconTrash size={14} />
                  </ActionIcon>
                </Group>
              </Card.Section>
            </Card>
          ))}
        </SimpleGrid>
      )}

      <Modal opened={opened} onClose={close} title="Записать привычку" centered>
        {selectedHabit && (
          <Stack gap="md">
            <Text fw={700}>{selectedHabit.title}</Text>
            <Group grow>
              <Button
                variant="light"
                color="green"
                onClick={() => {
                  const today = new Date().toISOString().split("T")[0];
                  dispatch(
                    upsertHabitLog({
                      habitId: selectedHabit.id,
                      data: {
                        date: today,
                        status: "done",
                      },
                    }),
                  );
                  close();
                }}
              >
                ✓ Выполнено
              </Button>
              <Button
                variant="light"
                color="red"
                onClick={() => {
                  const today = new Date().toISOString().split("T")[0];
                  dispatch(
                    upsertHabitLog({
                      habitId: selectedHabit.id,
                      data: {
                        date: today,
                        status: "missed",
                      },
                    }),
                  );
                  close();
                }}
              >
                ✗ Пропущено
              </Button>
            </Group>
            <Button variant="light" onClick={close}>
              Отмена
            </Button>
          </Stack>
        )}
      </Modal>

      <HabitLogsModal
        opened={logsOpened}
        onClose={closeLogs}
        habit={selectedHabit}
      />
    </Container>
  );
};
