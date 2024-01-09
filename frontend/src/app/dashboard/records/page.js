"use client";

import { api } from "@/common";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  MenuItem,
  Modal,
  Paper,
  Radio,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const types = [
  {
    label: "All",
    value: ["income", "expense"],
  },
  {
    label: "Expense",
    value: ["expense"],
  },
  {
    label: "Income",
    value: ["income"],
  },
];

const Page = () => {
  const [type, setType] = useState(types[0]);

  const [categories, setCategories] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    api
      .get("/categories", {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      })
      .then(({ data }) => {
        setCategories(data.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, []);

  useEffect(() => {
    api
      .get("/records", {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      })
      .then(({ data }) => {
        setRecords(data.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, []);

  console.log(records, "records");

  return (
    <Stack direction="row" gap={3} py={3}>
      <Stack width={300}>
        <Paper variant="outlined" sx={{ borderRadius: 4 }}>
          <Stack gap={3} px={2} py={3}>
            <Typography fontWeight="500" variant="h6">
              Records
            </Typography>

            <Button size="small" disableElevation variant="contained">
              Add Record
            </Button>

            <TextField size="small" placeholder="Search" />

            <Stack gap={2}>
              <Typography fontWeight="600">Types</Typography>

              <Stack>
                {types.map(({ label, value }) => {
                  return (
                    <Stack direction="row" alignItems="center">
                      <Radio
                        checked={type.label === label}
                        onClick={() => {
                          setType({ label, value });
                        }}
                      />

                      <Typography>{label}</Typography>
                    </Stack>
                  );
                })}
              </Stack>
            </Stack>

            <Stack gap={2}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="600">Category</Typography>

                <Button disableElevation size="small" variant="text">
                  <Typography
                    fontSize={14}
                    textTransform="none"
                    color="text.secondary"
                  >
                    Clear
                  </Typography>
                </Button>
              </Stack>

              <Stack gap={1}>
                {categories.map((category, index) => (
                  <Stack key={index}>
                    <Typography color="text.secondary">
                      {category.name}
                    </Typography>
                  </Stack>
                ))}
                <AddCategoryButton />
              </Stack>
            </Stack>

            <Stack>
              <Typography fontWeight="600">Amount Range</Typography>
            </Stack>
          </Stack>
        </Paper>
      </Stack>

      <Stack flex={1} gap={4}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" alignItems="center">
            <IconButton size="small"></IconButton>
          </Stack>

          <TextField defaultValue={"date"} select size="small">
            <MenuItem value={"date"}>Newest first</MenuItem>
          </TextField>
        </Stack>

        <Stack gap={2}>
          {records.map((item, index) => (
            <Card variant="outlined" key={index}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                p={2}
              >
                <Typography>{item.category}</Typography>

                <Typography
                  fontSize={20}
                  color={
                    item.type === "income" ? "success.light" : "error.light"
                  }
                >
                  {item.type === "income" ? "+" : "-"}
                  {item.amount}$
                </Typography>
              </Stack>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Page;

const AddCategoryButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const addCategory = async () => {
    setIsLoading(true);

    await api.post(
      "/categories",
      {
        name,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    setIsLoading(false);

    setIsOpen(false);
  };

  return (
    <>
      <Button
        size="small"
        disableElevation
        variant="outlined"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <Typography fontSize={14} textTransform="none">
          Add Category
        </Typography>
      </Button>

      <Modal
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        sx={{
          display: "flex !important",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card variant="outlined" sx={{ width: "100%", maxWidth: 400 }}>
          <CardContent>
            <Typography mb={4} fontSize={18}>
              Add Category
            </Typography>

            <Stack gap={2}>
              <TextField
                label="Category name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Stack>

            <Stack pt={4}>
              <Button
                disableElevation
                variant="contained"
                onClick={addCategory}
              >
                {isLoading ? "...Loading" : "Add"}
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
};
