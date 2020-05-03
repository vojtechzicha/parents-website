import React, { useEffect, useState } from 'react'
import { Table } from 'evergreen-ui'
import { get } from 'axios'

const conf = {
  0: 'https://1drv.ms/u/s!Al_GOxp7elhTluRKF68OsY3iDagcKw',
  1: 'https://1drv.ms/u/s!Al_GOxp7elhTluROQVpa08LJqHq3Pg',
}

export const Photos = ({ name }) => {
  const [items, setItems] = useState([])
  useEffect(() => {
    ;(async () => {
      const uri = `https://api.onedrive.com/v1.0/shares/u!${btoa(conf[name])}/root?expand=children`
      const res = (await get(uri)).data
      setItems(
        res.children
          .filter((i) => !i.name.includes('txt'))
          .map((i) => ({ name: i.name, id: i.id, description: '', url: i['@content.downloadUrl'] }))
      )
      res.children.forEach(async (i) => {
        if (res.children.filter((ii) => ii.name === `${i.name}.txt`).length > 0) {
          const inner = res.children.find((ii) => ii.name === `${i.name}.txt`)
          const description = (await get(inner['@content.downloadUrl'])).data
          setItems((items) => [
            ...items.filter((ii) => ii.id !== i.id),
            { name: i.name, id: i.id, description, url: i['@content.downloadUrl'] },
          ])
        }
      })
    })()
  }, [name])
  console.log(items)

  //https://api.onedrive.com/v1.0/shares/u!aHR0cHM6Ly8xZHJ2Lm1zL2YvcyFBdHVBTV9OYWN3VmFoaUZwdU1HU19CaVFDd1d1/root?expand=children

  return (
    <Table>
      <Table.Head>
        <Table.TextCell>Fotky</Table.TextCell>
        <Table.TextCell>Popis</Table.TextCell>
      </Table.Head>
      <Table.Body>
        {items.map((i) => (
          <Table.Row key={i.id}>
            <Table.TextCell>
              <a href={i.url}>{i.name}</a>
            </Table.TextCell>
            <Table.TextCell>{i.description}</Table.TextCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}
