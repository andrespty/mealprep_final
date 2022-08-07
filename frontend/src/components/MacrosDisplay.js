import React from 'react'
import { Box, Flex, Text, Center } from '@chakra-ui/react'
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

function MacrosDisplay({ fat, protein, carbs }) {

  const cal_protein = protein * 4
  const cal_carbs = carbs * 4
  const cal_fat = fat * 9

  const total_calories = cal_protein + cal_carbs + cal_fat
  const protein_percentage = ((cal_protein/total_calories) * 100)
  const carbs_percentage = ((cal_carbs/total_calories) * 100)
  const fat_percentage = ((cal_fat/total_calories) * 100)

  const data = {
    datasets: [
      {
        data: [fat_percentage,protein_percentage, carbs_percentage],
        backgroundColor: [
          '#FF6384', // Fat
          '#35A2EB', // Protein
          '#9967FF' // Carbs
        ],
      },
    ],
  }
  // #e60049", "#0bb4ff", "#50e991"
  const options = {
    events: [],
  }

  return (

    <Box>

      <Center mb={3}>
        <Box w={'35%'}>
          <Doughnut data={data} options={options} />
        </Box>
      </Center>

      <Flex dir='row' justifyContent={'space-evenly'}>
          <Box align='center'>
              <Text fontWeight='light' fontSize='xs' color={'#FF6384'}>{isNaN(fat_percentage) ? 0 : fat_percentage.toFixed(0)}%</Text>
              <Text fontWeight='bold' fontSize='md'>{fat.toFixed(0)} g</Text>
              <Text fontWeight='semilight' fontSize='sm'>Fat</Text>
          </Box>
          <Box align='center'>
            <Text fontWeight='light' fontSize='xs' color={'#35A2EB'}>{isNaN(protein_percentage) ? 0 : protein_percentage.toFixed(0)}%</Text>
              <Text fontWeight='bold' fontSize='md'>{protein.toFixed(0)} g</Text>
              <Text fontWeight='semilight' fontSize='sm'>Protein</Text>
          </Box>
          <Box align='center'>
            <Text fontWeight='light' fontSize='xs' color={'#9967FF'}>{isNaN(carbs_percentage) ? 0 : carbs_percentage.toFixed(0)}%</Text>
              <Text fontWeight='bold' fontSize='md'>{carbs.toFixed(0)} g</Text>
              <Text fontWeight='semilight' fontSize='sm'>Carbs</Text>
          </Box>
      </Flex>
    </Box>
  )
}

export default MacrosDisplay