import { useEffect } from "react";
import { Modal, Table, Text, Badge, Button, Center } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchHabitLogs, deleteHabitLog } from "@/store/habitsSlice";
import { IconTrash } from "@tabler/icons-react";
import { Habit } from "@/types";

interface HabitLogsModalProps {
  opened: boolean;
  onClose: () => void;
  habit: Habit | null;
}

export const HabitLogsModal = ({
  opened,
  onClose,
  habit,
}: HabitLogsModalProps) => {
  const dispatch = useAppDispatch();
  const { habitLogs, loading } = useAppSelector((state) => state.habits);
  const logs = habit ? habitLogs[habit.id] || [] : [];

  useEffect(() => {
    if (opened && habit) {
      dispatch(fetchHabitLogs(habit.id));
    }
  }, [opened, habit, dispatch]);

  const handleDeleteLog = (logId: number) => {
    if (habit && window.confirm("Are you sure?")) {
      dispatch(deleteHabitLog({ habitId: habit.id, logId }));
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={`Логи: ${habit?.title}`}
      centered
      size="lg"
    >
      {logs.length === 0 ? (
        <Center py="xl">
          <Text c="dimmed">Нет логов</Text>
        </Center>
      ) : (
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Дата</Table.Th>
              <Table.Th>Статус</Table.Th>
              <Table.Th style={{ textAlign: "right" }}>Действия</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {logs.map((log) => (
              <Table.Tr key={log.id}>
                <Table.Td>
                  <Badge variant="light">
                    {new Date(log.date).toLocaleDateString("ru-RU")}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Badge color={log.status === "done" ? "green" : "red"}>
                    {log.status === "done" ? "✓ Выполнено" : "✗ Пропущено"}
                  </Badge>
                </Table.Td>
                <Table.Td style={{ textAlign: "right" }}>
                  <Button
                    size="xs"
                    color="red"
                    variant="light"
                    onClick={() => handleDeleteLog(log.id)}
                    loading={loading}
                  >
                    <IconTrash size={14} />
                  </Button>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}
    </Modal>
  );
};
